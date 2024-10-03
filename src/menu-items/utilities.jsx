import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  SearchOutlined,
  FolderZipOutlined,
  NoteAddOutlined,
} from '@mui/icons-material';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  SearchOutlined,
  FolderZipOutlined,
  NoteAddOutlined,
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
      icon: icons.SearchOutlined,
    },
    {
      id: 'Archive',
      title: 'Workflow',
      type: 'item',
      url: '/workflow',
      icon: icons.AppstoreAddOutlined, // Nouvelle icône pour le workflow
    },
    {
      id: 'util-shadow',
      title: 'Archive',
      type: 'item',
      url: '/scan',
      icon: icons.FolderZipOutlined,
    },
    {
      id: 'decharge',
      title: 'E-decharge',
      type: 'item',
      url: '/decharge',
      icon: icons.NoteAddOutlined,
    },
  ],
};

export default utilities;
