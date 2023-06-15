import { Icon } from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';

import ImageGenerator from '@/views/app/image-generator';
import Editor from '@/views/app/editor';

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
  {
    name: 'Editor',
    layout: '/app',
    icon: (
      <Icon as={MdVideoLibrary} width="20px" height="20px" color="inherit" />
    ),
    path: '/editor',
    component: Editor,
  },
];

export default routes;
