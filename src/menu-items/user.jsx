// assets
import GroupIcon from '@mui/icons-material/Group';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
// icons
const icons = {
  GroupIcon,
  AddTaskIcon,
  HomeWorkIcon,
};

// ==============================|| MENU ITEMS - user ||============================== //

const userManagment = {
  id: 'group-user',
  title: "Gestion d'utilisateur",
  type: 'group',
  children: [
    {
      id: 'user-management',
      title: 'Utilitsateurs',
      type: 'item',
      url: '/user',
      icon: icons.GroupIcon,
      breadcrumbs: false,
    },
    {
      id: "droit d'access",
      title: "Droit d'access",
      type: 'item',
      url: '/roles',
      icon: icons.AddTaskIcon,
      breadcrumbs: false,
    },
    {
      id: 'CAU',
      title: 'CAU',
      type: 'item',
      url: '/centre',
      icon: icons.HomeWorkIcon,
      breadcrumbs: false,
    },
  ],
};

export default userManagment;
