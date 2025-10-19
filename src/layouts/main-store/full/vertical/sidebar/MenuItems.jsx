import { uniqueId } from 'lodash';

import { IconHome } from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'الرئيسية',
  },

  {
    id: uniqueId(),
    title: 'الصفحة الرئيسية',
    icon: IconHome,
    href: '/main-store',
    chip: 'جديد',
    chipColor: 'secondary',
  },
];

export default Menuitems;
