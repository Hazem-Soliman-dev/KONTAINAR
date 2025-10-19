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
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
];

//
// Profile dropdown
//
const profile = [
  {
    href: '/user-profile',
    title: 'My Profile',
    subtitle: 'Account Settings',
    icon: icon1,
  },
  {
    href: '/apps/email',
    title: 'My Inbox',
    subtitle: 'Messages & Emails',
    icon: icon2,
  },
  {
    href: '/apps/kanban',
    title: 'My Tasks',
    subtitle: 'To-do and Daily Tasks',
    icon: icon3,
  },
];

export { notifications, profile };
