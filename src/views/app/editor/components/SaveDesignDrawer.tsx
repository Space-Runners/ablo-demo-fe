import { useState } from 'react';

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  FormLabel,
} from '@chakra-ui/react';

import { saveTemplate } from '@/api/image-generator';
import Button from '@/components/Button';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

type Props = {
  onClose: () => void;
  onSave: (designName: string) => void;
  designName?: string;
  isSaving: boolean;
};

const getTemplateImgFromHtml = async (element) => {
  return saveTemplate(`Testing-${Date.now()}`, '').then(({ url }) => url);
};

function SaveDesignDrawer({ isSaving, onClose, onSave, designName }: Props) {
  const [name, setName] = useState(designName);

  return (
    <Drawer isOpen onClose={onClose} size={'md'} placement={'bottom'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody>
          <FormLabel color="#1A1A1A" fontSize="15px">
            Name of design
          </FormLabel>
          <Input
            autoFocus
            bg="#F5F5F5"
            borderRadius="10px"
            border="none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            padding="12px 14px"
            tabIndex={0}
            placeholder="Enter a name..."
            _placeholder={{
              color: '#878787',
              fontWeight: 500,
            }}
          />
        </DrawerBody>
        <DrawerFooter>
          <Button
            color={'white'}
            bg={abloBlue}
            isLoading={isSaving}
            isDisabled={!name}
            onClick={() => onSave(name)}
            title="Save"
            w="100%"
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SaveDesignDrawer;
