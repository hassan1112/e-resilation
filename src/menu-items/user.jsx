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
      breadcrumbs: true,
    },
    {
      id: "droit d'access",
      title: "Droit d'access",
      type: 'item',
      url: '/roles',
      icon: icons.AddTaskIcon,
      breadcrumbs: true,
    },
    {
      id: 'CAU',
      title: 'CAU',
      type: 'item',
      url: '/center',
      icon: icons.HomeWorkIcon,

      breadcrumbs: true,
    },
  ],
};

export default userManagment;
