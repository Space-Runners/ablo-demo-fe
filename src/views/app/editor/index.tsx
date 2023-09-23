import { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import { Box, Center, HStack, Spinner } from '@chakra-ui/react';
import { useMe } from '@/api/auth';
import { getDesign, saveDesign } from '@/api/designs';
import { getSizes } from '@/api/sizes';
import { getTemplates } from '@/api/templates';

import Button from '@/components/Button';
import Navbar from '@/components/navbar/Navbar';
import { Design, Template } from '@/components/types';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';
import ForgotPasswordModal from '@/views/auth/ForgotPasswordModal';

import FeedbackAlert from './components/FeedbackAlert';
import { IconBack } from './components/Icons';
import SaveDesignDrawer from './components/SaveDesignDrawer';
import ConfirmEditorExitModal from './components/ConfirmEditorExitModal';

import EditorTool from './EditorTool';

import getEditorStateAsImages from './utils/template-export';

export default function ImageEditorPage() {
  const [activeDesign, setActiveDesign] = useState<Design>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [templates, setTemplates] = useState<Template[]>(null);

  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [isSignInModalVisible, setSignInModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
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

    Promise.all([getTemplates(), getSizes()]).then(([templates, sizes]) => {
      const [defaultTemplate] = templates;

      const { colors, sides } = defaultTemplate;

      const defaultColor = colors.find((color) => color.name === 'OatMilk');

      setTemplates(templates);

      const defaultDesign = {
        name: '',
        templateColorId: defaultColor.id,
        template: defaultTemplate,
        sizeId: sizes[0].id,
        sides: sides.map(({ id }) => ({ templateSideId: id })),
      };

      if (!designId) {
        setActiveDesign(defaultDesign);

        setIsLoading(false);
        return;
      }

      getDesign(designId)
        .then((design) => {
          const fullTemplate = templates.find(({ id }) => id === design.template.id);

          setActiveDesign({
            ...design,
            template: fullTemplate,
          });

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
      const [previewImageFront, imageFront, previewImageBack, imageBack] =
        await getEditorStateAsImages();

      const { sides, template } = activeDesign;

      const { sides: templateSides } = templates.find(({ id }) => id === template.id);

      const sidesWithImages = sides.map((side) => {
        const sideName = templateSides.find(({ id }) => id === side.templateSideId).name;

        const defaultProperties = {
          canvasState: '',
          hasGraphics: false,
          hasText: false,
        };

        const isFront = sideName.toLowerCase() === 'front';

        return {
          ...defaultProperties,
          ...side,
          previewImage: isFront ? previewImageFront : previewImageBack,
          designImage: isFront ? imageFront : imageBack,
        };
      });

      const design = {
        ...activeDesign,
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
            {!isGuest && (
              <Button
                h="40px"
                icon={<IconBack />}
                onClick={handleGoBack}
                outlined
                textTransform="none"
                title="Back To Designs"
              />
            )}
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
          onGoToForgotPassword={() => {
            setSignInModalVisible(false);
            setForgotPasswordModalVisible(true);
          }}
          onSignIn={() => {
            setSignInModalVisible(false);

            handleGoToSaveDesign();
          }}
        />
      ) : null}
      {isForgotPasswordModalVisible ? (
        <ForgotPasswordModal
          onClose={() => setForgotPasswordModalVisible(false)}
          onGoToSignin={() => {
            setSignInModalVisible(true);
            setForgotPasswordModalVisible(false);
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
