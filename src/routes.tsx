import { Icon } from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';

import ImageGenerator from '@/views/app/image-generator';

const routes = [
  {
    name: 'Image Generator',
    layout: '/app',
    icon: (
      <Icon as={MdVideoLibrary} width="20px" height="20px" color="inherit" />
    ),
    path: '/image-generator',
    component: ImageGenerator,
  },
];

export default routes;
