import { Icon } from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';

import Editor from '@/views/app/editor';
import ProductsPage from '@/views/app/products';
import OrderOrSharePage from '@/views/app/order-or-share';

const routes = [
  {
    name: 'Editor',
    layout: '/app',
    icon: (
      <Icon as={MdVideoLibrary} width="20px" height="20px" color="inherit" />
    ),
    path: '/editor',
    component: Editor,
  },
  {
    name: 'Editor',
    layout: '/app',
    path: '/products',
    component: ProductsPage,
  },
  {
    name: 'Order/Share',
    layout: '/app',
    path: '/order-or-share',
    component: OrderOrSharePage,
  },
];

export default routes;
