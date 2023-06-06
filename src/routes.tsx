import { Icon } from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';

import Videos from '@/views/admin/videos';

const routes = [
  {
    name: 'Videos',
    layout: '/admin',
    icon: (
      <Icon as={MdVideoLibrary} width="20px" height="20px" color="inherit" />
    ),
    path: '/videos',
    component: Videos,
  },
];

export default routes;
