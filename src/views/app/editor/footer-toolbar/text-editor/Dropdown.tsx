import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Text,
} from '@chakra-ui/react';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
} from './Icons';
import { ReactNode, useState } from 'react';

const ChevronDownIcon = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.59313 6.93039L0.564728 1.29062C0.328346 0.959685 0.564908 0.5 0.971595 0.5H9.02841C9.43509 0.5 9.67165 0.959685 9.43527 1.29062L5.40687 6.93039C5.20746 7.20956 4.79254 7.20956 4.59313 6.93039Z"
      fill="#212121"
    />
  </svg>
);

type Props = {
  icon: ReactNode;
  name: string;
  options: string[];
  onSelectedOption: (value: string) => void;
  selectedOption: string;
};

export default function Dropdown({
  icon,
  name,
  options,
  onSelectedOption,
  selectedOption,
}: Props) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="#FAFAFA"
        border="1px solid #BFBFBF"
        borderRadius="5px"
        fontSize="md"
        fontWeight={400}
        height="46px"
        padding="8px 16px"
        rightIcon={<ChevronDownIcon />}
        width="213px"
        _focus={{ bg: '#FAFAFA' }}
        _active={{ bg: '#FAFAFA' }}
      >
        <Flex>
          <HStack>
            {icon}
            <Text as="b" fontWeight={700}>
              {name}
            </Text>
          </HStack>
          <Text flex={1}>{selectedOption}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem onClick={() => onSelectedOption(option)}>{option}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
