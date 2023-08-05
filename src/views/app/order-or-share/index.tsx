import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

import Button from '@/components/Button';
import Navbar from '@/components/navbar/Navbar';
import Colors from '@/theme/colors';

import { Design } from '@/components/types';

import { IconInstagram, IconTikTok, IconFacebook } from './Icons';
import { useState } from 'react';

function getImgUrl(name) {
  return new URL(`./images/${name}.webp`, import.meta.url).href;
}

const { abloBlue } = Colors;

const SHARE_OPTIONS = [
  {
    name: 'Instagram',
    icon: <IconInstagram />,
  },
  {
    name: 'TikTok',
    icon: <IconTikTok />,
  },
  {
    name: 'Facebook',
    icon: <IconFacebook />,
  },
];

const IconChangeOrientation = () => (
  <Icon
    width="22px"
    height="22px"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2455_8217)">
      <path
        d="M15.4999 13.9956C17.6725 13.3494 19.0999 12.2496 19.0999 11.0004C19.0999 9.01139 15.4729 7.40039 10.9999 7.40039C6.5269 7.40039 2.8999 9.01139 2.8999 11.0004C2.8999 12.9894 6.5269 14.6004 10.9999 14.6004"
        stroke="white"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29993 11.9004L10.9999 14.6004L8.29993 17.3004"
        stroke="white"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2455_8217">
        <rect
          width="21.6"
          height="21.6"
          fill="white"
          transform="translate(0.199951 0.200195)"
        />
      </clipPath>
    </defs>
  </Icon>
);

const IconCopy = () => (
  <Icon
    width="25px"
    height="24px"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1948_36883)">
      <path
        d="M9.5 15L15.5 9"
        stroke="#064AC4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 6.00031L11.963 5.46431C12.9008 4.52663 14.1727 3.99991 15.4989 4C16.825 4.00009 18.0968 4.527 19.0345 5.46481C19.9722 6.40261 20.4989 7.6745 20.4988 9.00066C20.4987 10.3268 19.9718 11.5986 19.034 12.5363L18.5 13.0003"
        stroke="#064AC4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5001 18L13.1031 18.534C12.1544 19.4722 10.8739 19.9984 9.53964 19.9984C8.20535 19.9984 6.92489 19.4722 5.97614 18.534C5.5085 18.0716 5.13724 17.521 4.88385 16.9141C4.63047 16.3073 4.5 15.6561 4.5 14.9985C4.5 14.3408 4.63047 13.6897 4.88385 13.0829C5.13724 12.476 5.5085 11.9254 5.97614 11.463L6.50014 11"
        stroke="#064AC4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1948_36883">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </Icon>
);

export default function OrderOrShare({ design }: { design: Design }) {
  const { front, back } = design || {};

  const [selectedSide, setSelectedSide] = useState(front ? 'front' : 'back');

  const history = useHistory();

  const { aiImage } = design[selectedSide] || {};

  const { style = 'kidult' } = aiImage?.options || {};

  return (
    <Box>
      <Navbar onBack={() => history.goBack()} title="Share" />
      <Box bg="#FFFFFF" h="100%" overflow="auto" w="100%" padding="10px 0">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          w="100%"
        >
          {front?.templateUrl && back?.templateUrl ? (
            <Flex
              align="center"
              as="button"
              bg="#000000"
              borderRadius={0}
              h="36px"
              justify="center"
              onClick={() =>
                setSelectedSide(selectedSide === 'front' ? 'back' : 'front')
              }
              position="absolute"
              left={0}
              top={0}
              w="36px"
            >
              <IconChangeOrientation />
            </Flex>
          ) : null}
          {style ? (
            <Image w="100%" src={getImgUrl(`${style}`)} alt={style} />
          ) : null}
          {style ? (
            <Image
              src={(selectedSide === 'front' ? front : back)?.templateUrl}
              margin="0 auto"
              position="absolute"
              width={306}
            />
          ) : null}
        </Box>
        <Box p="0 10px">
          <Button
            icon={<IconCopy />}
            mb="16px"
            mt="16px"
            title="Copy share link"
            w="100%"
          />
          <Text mb="24px" textAlign="center">
            Share on your socials
          </Text>
          {SHARE_OPTIONS.map(({ name, icon }, index) => (
            <Flex
              align="center"
              borderTop={index === 0 ? 'none' : '1px solid #D4D4D3'}
              justify="space-between"
              key={index}
              padding="13px 0"
              w="100%"
            >
              <HStack>
                {icon}
                <Text fontSize="sm" ml="12px">
                  {name}
                </Text>
              </HStack>
              <ChakraButton
                bg="transparent"
                color={abloBlue}
                fontSize="xs"
                fontWeight={600}
                padding={0}
                textTransform="uppercase"
              >
                Share
              </ChakraButton>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
