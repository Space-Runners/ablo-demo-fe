import { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import { Box, Center, HStack, Show, Spinner } from '@chakra-ui/react';

import { getDesign, saveDesign } from '@/api/designs';

import Button from '@/lib/components/Button';
import Navbar from '@/lib/components/navbar';
import { Design, Template, User } from '@/lib/types';

import FeedbackAlert from './components/FeedbackAlert';
import { IconBack } from './components/Icons';
import SaveDesignDrawer from './components/SaveDesignDrawer';
import ConfirmEditorExitModal from './components/ConfirmEditorExitModal';

import EditorTool from '@/lib/editor';

type ImageEditorPageProps = {
  pendingDesign: Design;
  onPendingDesignChange: (design: Design) => void;
  loadingTemplates: boolean;
  templates: Template[];
  user: User;
};

export default function ImageEditorPage({
  pendingDesign,
  onPendingDesignChange,
  loadingTemplates,
  templates,
  user: me,
}: ImageEditorPageProps) {
  const [activeDesign, setActiveDesign] = useState<Design>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [isSaveDesignDrawerVisible, setSaveDesignDrawerVisible] = useState(false);

  const [isSavingDesign, setSavingDesign] = useState(false);
  const [errorSavingDesign, setErrorSavingDesign] = useState(null);
  const [isDesignSaved, setIsDesignSaved] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isConfirmExitModalVisible, setModalConfirmExitModalVisible] = useState(false);

  const history = useHistory();

  const { search } = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const designId = searchParams.get('designId');

    if (!designId) {
      setIsLoading(false);
      return;
    }

    getDesign(designId)
      .then((design) => {
        setActiveDesign(design);

        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [search]);

  const handleGoToSaveDesign = () => {
    setSaveDesignDrawerVisible(true);
  };

  const handleSaveDesign = async (name?) => {
    setSavingDesign(true);
    setHasChanges(false);

    try {
      const designToUse = activeDesign || pendingDesign;

      const { sides, templateId } = designToUse;

      const template = templates.find(({ id }) => id === templateId);

      const sidesWithImages = sides.map((side) => {
        const canvas = side.canvas;

        const defaultProperties = {
          canvasState: '',
          hasGraphics: false,
          hasText: false,
        };

        const newSide = {
          ...defaultProperties,
          ...side,
          canvas: null,
        };

        let dataUrl = '';

        if (canvas) {
          dataUrl = canvas.toDataURL({
            width: canvas.width,
            height: canvas.height,
            left: 0,
            top: 0,
            format: 'png',
          });

          newSide.previewImage = dataUrl;
          newSide.designImage = dataUrl;
        }

        return newSide;
      });

      const design = {
        ...designToUse,
        sides: sidesWithImages,
        templateId: template.id,
      };

      delete design.template;

      if (name) {
        delete design.id;
        design.name = name;
      }

      const newDesign = await saveDesign(design);

      setIsDesignSaved(true);
      onPendingDesignChange(null);

      if (design.id) {
        setTimeout(() => {
          setIsDesignSaved(false);
        }, 3000);
      } else {
        history.replace(`/app/editor?designId=${newDesign.id}`);
        history.push(`/app/order-or-share?designId=${newDesign.id}`);
      }
    } catch (err) {
      setErrorSavingDesign(err.response?.data2?.message || err.message);

      setTimeout(() => {
        setErrorSavingDesign(null);
      }, 3000);
    } finally {
      setSaveDesignDrawerVisible(false);
      setSavingDesign(false);
    }
  };

  const handleGoBack = () => {
    if (!activeDesign) {
      history.push('/app/templates');

      return;
    }

    if (hasChanges) {
      setModalConfirmExitModalVisible(true);
    } else {
      history.push('/app/designs');
    }
  };

  return (
    <Box bg="#FFFFFF" h="100vh" w="100%">
      <Navbar
        onBack={handleGoBack}
        onNext={handleGoToSaveDesign}
        rightSideContent={
          <Show above="md">
            <HStack>
              <Button
                h="40px"
                icon={<IconBack />}
                onClick={handleGoBack}
                outlined
                textTransform="none"
                title={`Back To ${activeDesign ? 'Designs' : 'Templates'}`}
              />
              <Button
                h="40px"
                onClick={handleGoToSaveDesign}
                textTransform="none"
                title="Finish & Share"
              />
            </HStack>
          </Show>
        }
        title="Create design"
        user={me}
      />
      {isLoading || loadingTemplates ? (
        <Center bg="#FFFFFF" h={{ base: 'calc(100% - 121px)', md: 'calc(100% - 65px)' }}>
          <Spinner thickness="1px" speed="0.65s" emptyColor="gray" size="md" />
        </Center>
      ) : (
        <EditorTool
          design={activeDesign || pendingDesign}
          onDesignChange={(design) => {
            if (!activeDesign) {
              onPendingDesignChange(design);

              return;
            }

            setHasChanges(true);
            setActiveDesign(design);
          }}
          onSave={() => handleSaveDesign()}
          templates={templates}
        />
      )}
      {(errorSavingDesign || isDesignSaved) && (
        <Box
          position="absolute"
          left={{ base: 0, md: '393px' }}
          right={0}
          top={{ base: '191px', md: '140px' }}
        >
          <FeedbackAlert error={errorSavingDesign} onClose={() => setErrorSavingDesign(null)} />
        </Box>
      )}

      {isSaveDesignDrawerVisible ? (
        <SaveDesignDrawer
          isSaving={isSavingDesign}
          onClose={() => {
            setSaveDesignDrawerVisible(false);
          }}
          onSave={handleSaveDesign}
        />
      ) : null}
      {isConfirmExitModalVisible && (
        <ConfirmEditorExitModal
          onClose={() => {
            history.push(`/designs`);

            setModalConfirmExitModalVisible(false);
          }}
          onSave={() => {
            setModalConfirmExitModalVisible(false);

            if (activeDesign.id) {
              handleSaveDesign();
            } else {
              handleGoToSaveDesign();
            }
          }}
        />
      )}
    </Box>
  );
}
