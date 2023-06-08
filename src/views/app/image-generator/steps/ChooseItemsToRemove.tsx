import { VStack } from '@chakra-ui/react';

import Button from '../components/Button';
import Card from '../components/Card';

const OPTIONS = [
  {
    key: 'text:-1.5',
    name: 'text',
  },
  {
    key: 'watermark:-1.5',
    name: 'watermark',
  },
  {
    key: 'compression:-1.5',
    name: 'compression',
  },
  {
    key: 'complex:-1.5',
    name: 'complex background',
  },
];

type Props = {
  keys: string[];
  onUpdate: ({ keys }: { keys: string[] }) => void;
};

export default function ChooseItemsToRemove({ keys = [], onUpdate }: Props) {
  const handleToggleItem = (key: string) => {
    let newKeys = [];

    if (keys.includes(key)) {
      newKeys = keys.filter((item) => item !== key);
    } else {
      newKeys = [...keys, key];
    }

    onUpdate({ keys: newKeys });
  };

  return (
    <Card title="What don't you want to see in your art?">
      <VStack spacing={6} mt={10}>
        {OPTIONS.map(({ key, name }) => (
          <Button
            key={key}
            isSelected={keys.includes(name)}
            onClick={() => handleToggleItem(name)}
            title={name}
          />
        ))}
      </VStack>
    </Card>
  );
}
