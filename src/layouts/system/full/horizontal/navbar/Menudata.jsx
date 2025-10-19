import {
  IconHome,
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'الصفحة الرئيسية',
    icon: IconHome,
    href: '/system',
  },
];
export default Menuitems;
