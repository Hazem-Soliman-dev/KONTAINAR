import img1 from '../../../../../assets/images/profile/user-1.jpg';
import img2 from '../../../../../assets/images/profile/user-2.jpg';
import img3 from '../../../../../assets/images/profile/user-3.jpg';
import img4 from '../../../../../assets/images/profile/user-4.jpg';

import icon1 from '../../../../../assets/images/svgs/icon-account.svg';
import icon2 from '../../../../../assets/images/svgs/icon-inbox.svg';
import icon3 from '../../../../../assets/images/svgs/icon-tasks.svg';

//
// Notifications dropdown
//
const notifications = [
  {
    avatar: img1,
    title: 'كونتينر قد انضم إلى الفريق!',
    subtitle: 'يدعوك للترحيب به',
  },
  {
    avatar: img2,
    title: 'رسالة جديدة من كونتينر',
    subtitle: 'كونتينر يرسل لك رسالة جديدة',
  },
  {
    avatar: img3,
    title: 'دفعة جديدة من كونتينر',
    subtitle: 'تحقق من أرباحك',
  },
  {
    avatar: img4,
    title: 'كونتينر قد إنجز المهام',
    subtitle: 'تعيين مهام جديدة له',
  },
  {
    avatar: img1,
    title: 'كونتينر قد انضم إلى الفريق!',
    subtitle: 'يدعوك للترحيب به',
  },
  {
    avatar: img2,
    title: 'رسالة جديدة من كونتينر',
    subtitle: 'كونتينر يرسل لك رسالة جديدة',
  },
  {
    avatar: img3,
    title: 'دفعة جديدة من كونتينر',
    subtitle: 'تحقق من أرباحك',
  },
  {
    avatar: img4,
    title: 'كونتينر قد إنجز المهام',
    subtitle: 'تعيين مهام جديدة له',
  },
];

//
// Profile dropdown
//
const profile = [
  {
    href: '/user-profile',
    title: 'ملفي الشخصي',
    subtitle: 'إعدادات الحساب',
    icon: icon1,
  },
  {
    href: '/apps/email',
    title: 'البريد الإلكتروني',
    subtitle: 'الرسائل والبريد الإلكتروني',
    icon: icon2,
  },
  {
    href: '/apps/kanban',
    title: 'المهام',
    subtitle: 'المهام اليومية والمهام اليومية',
    icon: icon3,
  },
];

export { notifications, profile };
