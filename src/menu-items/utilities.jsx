import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { SearchOutlined, NoteAdd as NoteAddIcon } from '@mui/icons-material'; // Ajout de l'import de NoteAddIcon

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
  NoteAddIcon // Ajout de NoteAddIcon dans l'objet icons
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
      icon: icons.AppstoreAddOutlined // Nouvelle icône pour le workflow
    },
    {
      id: 'util-shadow',
      title: 'Nouvelle Demande',
      type: 'item',
      url: '/scan',
      icon: icons.NoteAddIcon // Remplacement de l'icône par NoteAddIcon
    },
    {
      id: 'decharge',
      title: 'E-decharge',
      type: 'item',
      url: '/decharge',
      icon: icons.BarcodeOutlined
    }
  ]
};

export default utilities;
