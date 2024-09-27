// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { SearchOutlined } from '@mui/icons-material';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  SearchOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-color',
      title: 'Consultation Document',
      type: 'item',
      url: '/recherche',
      icon: icons.SearchOutlined
    },
    {
      id: 'Archive',
      title: 'Workflow',
      type: 'item',
      url: '/workflow',
      icon: icons.UserOutlined
    },
    {
      id: 'util-typography',
      title: 'User Managment',
      type: 'item',
      url: '/typography',
      icon: icons.UserOutlined
    },

    {
      id: 'util-shadow',
      title: 'Print',
      type: 'item',
      url: '/dashboard',
      icon: icons.BarcodeOutlined
    }
  ]
};

export default utilities;
