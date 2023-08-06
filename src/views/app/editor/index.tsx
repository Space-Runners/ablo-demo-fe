import { useEffect, useState } from 'react';

import { useLocation, useHistory } from 'react-router-dom';

import { Box, Center, Spinner } from '@chakra-ui/react';
import { useMe } from '@/api/auth';
import { getDesign, saveDesign } from '@/api/designs';

import Navbar from '@/components/navbar/Navbar';
import { Design } from '@/components/types';

import PRODUCTS from '@/data/products';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';

import FeedbackAlert from './components/FeedbackAlert';
import SaveDesignDrawer from './components/SaveDesignDrawer';
import ConfirmEditorExitModal from './components/ConfirmEditorExitModal';

import EditorTool from './EditorTool';

import getEditorStateAsImageUrls from './utils/template-export';

const DEFAULT_DESIGN = {
  garmentId: PRODUCTS[0].id,
  garmentColor: 'OatMilk',
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
  const [activeDesign, setActiveDesign] = useState<Design>(DEFAULT_DESIGN);
  const [hasChanges, setHasChanges] = useState(false);

  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [isSignInModalVisible, setSignInModalVisible] = useState(false);
  const [isSaveDesignDrawerVisible, setSaveDesignDrawerVisible] =
    useState(false);

  const [isSavingDesign, setSavingDesign] = useState(false);
  const [errorSavingDesign, setErrorSavingDesign] = useState(null);
  const [isDesignSaved, setIsDesignSaved] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isConfirmExitModalVisible, setModalConfirmExitModalVisible] =
    useState(false);

  const history = useHistory();

  const { data: me } = useMe();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  useEffect(() => {
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
  }, []);

  const handleNext = () => {
    // canvas.current.discardActiveObject().renderAll();

    if (me && me.roles[0] !== 'guest') {
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
      const [urlFront, urlBack] = await getEditorStateAsImageUrls();

      const { editorState: originalEditorState } = activeDesign;

      const editorState = {
        front: {
          ...originalEditorState.front,
          templateUrl: urlFront,
        },
        back: {
          ...originalEditorState.back,
          templateUrl: urlBack,
        },
      };

      const design = {
        ...activeDesign,
        editorState,
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
        history.push(`/app/order-or-share?designId=${newDesign.id}`);
      }
    } catch (err) {
      setErrorSavingDesign(err.response?.data2?.message || err.message);
    } finally {
      setSaveDesignDrawerVisible(false);
      setSavingDesign(false);
    }
  };

  return (
    <Box bg="#FFFFFF" h="100vh" w="100%">
      <Navbar
        onBack={
          me &&
          (() => {
            if (hasChanges) {
              setModalConfirmExitModalVisible(true);
            } else {
              history.goBack();
            }
          })
        }
        onNext={() => handleNext()}
        title="Create design"
      />
      {isLoading ? (
        <Center
          bg="#FFFFFF"
          h={{ base: 'calc(100% - 121px)', md: 'calc(100% - 65px)' }}
        >
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
        />
      )}
      {(errorSavingDesign || isDesignSaved) && (
        <Box position="absolute" left={0} right={0} top="191px">
          <FeedbackAlert error={errorSavingDesign} />
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

            handleGoToSaveDesign();
          }}
        />
      )}
    </Box>
  );
}
