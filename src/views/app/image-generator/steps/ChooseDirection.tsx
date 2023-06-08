import { Box, Flex, Image, Skeleton, Stack, VStack } from '@chakra-ui/react';

import { useEngines } from '@/api/image-generator';

import Button from '../components/Button';
import Card from '../components/Card';

import Logo from './images/Logo.png';

const connectorStyle = {
  border: '0.5px solid',
  width: '80px',
};

type Props = {
  engineId: string;
  onUpdate: ({ engineId }: { engineId: string }) => void;
};

export default function ChooseDirection({ engineId, onUpdate }: Props) {
  const { data: engines = [], isLoading } = useEngines();

  return (
    <Card title="Choose direction for your future art work">
      {isLoading ? (
        <Stack padding="16px">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <VStack overflow="auto" spacing={6} mt={10}>
          {engines.map(({ id, name }) => (
            <Flex align="center" key={id}>
              <Button
                isSelected={id === engineId}
                onClick={() => onUpdate({ engineId: id })}
                title={name}
              />
              <Box style={connectorStyle} />
              <Image boxSize="100px" src={Logo} />
            </Flex>
          ))}
        </VStack>
      )}
    </Card>
  );
}
