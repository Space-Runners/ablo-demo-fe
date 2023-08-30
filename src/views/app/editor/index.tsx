import { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import { Box, Center, HStack, Spinner } from '@chakra-ui/react';
import { useMe } from '@/api/auth';
import { getDesign, saveDesign } from '@/api/designs';
import { getTemplates } from '@/api/templates';

import Button from '@/components/Button';
import Navbar from '@/components/navbar/Navbar';
import { Design, Template } from '@/components/types';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';

import FeedbackAlert from './components/FeedbackAlert';
import { IconBack } from './components/Icons';
import SaveDesignDrawer from './components/SaveDesignDrawer';
import ConfirmEditorExitModal from './components/ConfirmEditorExitModal';

import EditorTool from './EditorTool';

import getEditorStateAsImages from './utils/template-export';

const DEFAULT_DESIGN = {
  templateColor: 'OatMilk',
  name: '',
  size: 'S',
  editorState: {
    front: {
      canvas: null,
    },
    back: {
      canvas: null,
    },
  },
};

export default function ImageEditorPage() {
  const [activeDesign, setActiveDesign] = useState<Design>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [templates, setTemplates] = useState<Template[]>(null);

  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [isSignInModalVisible, setSignInModalVisible] = useState(false);
  const [isSaveDesignDrawerVisible, setSaveDesignDrawerVisible] = useState(false);

  const [isSavingDesign, setSavingDesign] = useState(false);
  const [errorSavingDesign, setErrorSavingDesign] = useState(null);
  const [isDesignSaved, setIsDesignSaved] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isConfirmExitModalVisible, setModalConfirmExitModalVisible] = useState(false);

  const history = useHistory();

  const { data: me } = useMe();

  const { search } = useLocation();

  const isGuest = !me || me.roles[0] === 'guest';

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const designId = searchParams.get('designId');

    getTemplates().then((templates) => {
      const templateId = templates[0].id;

      setTemplates(templates);

      if (!designId) {
        setActiveDesign({
          ...DEFAULT_DESIGN,
          templateId,
        });

        setIsLoading(false);
        return;
      }

      getDesign(designId)
        .then((design) => {
          setActiveDesign(design);

          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    });
  }, [search]);

  const handleNext = () => {
    if (!isGuest) {
      handleGoToSaveDesign();

      return;
    }

    setSignInModalVisible(true);
  };

  const handleGoToSaveDesign = () => {
    setSaveDesignDrawerVisible(true);
  };

  const handleSaveDesign = async (name?) => {
    setSavingDesign(true);
    setHasChanges(false);

    try {
      const [rawImageFront, rawImageBack] = await getEditorStateAsImages();

      const { editorState } = activeDesign;

      const design = {
        ...activeDesign,
        editorState,
        rawImageFront,
        rawImageBack,
      };

      if (name) {
        design.id = null;
        design.name = name;
      }

      const newDesign = await saveDesign(design);

      setIsDesignSaved(true);

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
    if (hasChanges) {
      setModalConfirmExitModalVisible(true);
    } else {
      history.push('/designs');
    }
  };

  return (
    <Box bg="#FFFFFF" h="100vh" w="100%">
      <Navbar
        onBack={!isGuest && handleGoBack}
        onNext={handleNext}
        rightSideContent={
          <HStack>
            <Button
              h="40px"
              icon={<IconBack />}
              onClick={handleGoBack}
              outlined
              textTransform="none"
              title="Back To Designs"
            />
            <Button h="40px" onClick={handleNext} textTransform="none" title="Finish & Share" />
          </HStack>
        }
        title="Create design"
      />
      {isLoading ? (
        <Center bg="#FFFFFF" h={{ base: 'calc(100% - 121px)', md: 'calc(100% - 65px)' }}>
          <Spinner thickness="1px" speed="0.65s" emptyColor="gray" size="md" />
        </Center>
      ) : (
        <EditorTool
          design={activeDesign}
          onDesignChange={(design) => {
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
      {isSignUpModalVisible ? (
        <SignUpModal
          onClose={() => setSignUpModalVisible(false)}
          onGoToSignin={() => {
            setSignInModalVisible(true);
            setSignUpModalVisible(false);
          }}
          onSignUp={() => {
            setSignUpModalVisible(false);

            handleGoToSaveDesign();
          }}
        />
      ) : null}
      {isSignInModalVisible ? (
        <SignInModal
          onClose={() => setSignInModalVisible(false)}
          onGoToSignup={() => {
            setSignInModalVisible(false);
            setSignUpModalVisible(true);
          }}
          onSignIn={() => {
            setSignInModalVisible(false);

            handleGoToSaveDesign();
          }}
        />
      ) : null}
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
