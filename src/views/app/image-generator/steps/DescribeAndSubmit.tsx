import { useState } from 'react';

import { Flex, Image, Input, VStack, Wrap, WrapItem } from '@chakra-ui/react';

import { generateImage } from '@/api/image-generator';

import Button from '../components/Button';
import Card from '../components/Card';

const KEYWORDS = [
  'art',
  'anthropomorphic',
  'mouse',
  'landscape photography',
  'scarf',
  'portrait',
  'woman',
  'cat',
  'lion',
  'fish',
  'eagle',
  'hat',
];

const inputStyle = {
  bg: 'rgb(204, 219, 241)',
  borderRadius: 20,
  border: '1px solid',
  color: '#333333',
  h: '100px',
  marginTop: '30px',
  w: '600px',
};

type Props = {
  params: any;
};

export default function DescribeAndSubmit({ params }: Props) {
  const [keywords, setKeywords] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [waiting, setWaiting] = useState(false);

  const [image, setImage] = useState(null);

  const handleToggleItem = (key: string) => {
    let newKeywords = [];

    if (keywords.includes(key)) {
      newKeywords = keywords.filter((item) => item !== key);
    } else {
      newKeywords = [...keywords, key];
    }

    setKeywords(newKeywords);
  };

  const { keys = [], ...rest } = params;

  const text = [textInput, ...keywords, ...keys].join(', ');

  const handleSubmit = () => {
    setWaiting(true);

    const requestParams = {
      ...rest,
      text,
    };

    generateImage(requestParams)
      .then((image) => {
        setWaiting(false);

        setImage(image);
      })
      .catch(() => {
        setWaiting(false);
      });
  };

  return (
    <Card
      title="Describe your character (free text or subject words)"
      width="800px"
    >
      <VStack mt={10} overflow="auto" spacing={10}>
        <Wrap spacing={6}>
          {KEYWORDS.map((name) => (
            <WrapItem key={name}>
              <Button
                borderRadius={8}
                isSelected={keywords.includes(name)}
                onClick={() => handleToggleItem(name)}
                h="40px"
                title={name}
              />
            </WrapItem>
          ))}
        </Wrap>
        <Flex align="center">
          <Input
            {...inputStyle}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Add additional prompts"
            _placeholder={{ color: 'inherit' }}
          />
          <Button
            colorScheme="purple"
            isLoading={waiting}
            ml={5}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Flex>
        {image ? <Image src={image} /> : null}
      </VStack>
    </Card>
  );
}
