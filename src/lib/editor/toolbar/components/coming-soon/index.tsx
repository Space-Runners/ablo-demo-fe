import { Image, Text, VStack } from "@chakra-ui/react";

import FontToImage from "./illustrations/FontToImage.png";
import ImageToImage from "./illustrations/ImageToImage.png";

const FEATURES = {
  fontToImage: { title: "Font to Image", illustration: FontToImage },
  imageToImage: { title: "Image to Image", illustration: ImageToImage },
};

type ComingSoonProps = {
  feature: string;
};

const ComingSoon = ({ feature }: ComingSoonProps) => {
  const { illustration, title } = FEATURES[feature];

  return (
    <VStack h="300px" justify="center" w="100%">
      <Image h="113px" mb="10px" src={illustration} w="108px" />
      <Text as="b" fontSize="17px">
        {title}
      </Text>
      <Text fontSize="sm">Coming soon</Text>
    </VStack>
  );
};
export default ComingSoon;
