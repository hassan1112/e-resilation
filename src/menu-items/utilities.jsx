import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  UserOutlined,
  
} from '@ant-design/icons';

import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import { SearchOutlined } from '@mui/icons-material'; // Ajout de l'import de NoteAddIcon

import { FolderZipOutlined, NoteAddOutlined, DocumentScannerOutlined } from '@mui/icons-material';

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
  DocumentScannerOutlined,
  FolderZipOutlined,
  NoteAddOutlined,
  DocumentScannerOutlinedIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Workflow',
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
      title: 'Résiliation',
      type: 'item',
      url: '/workflow',
      icon: icons.AppstoreAddOutlined, // Nouvelle icône pour le workflow
    },
    {
      id: 'util-shadow',

      title: 'Nouvelle Demande',
      type: 'item',
      url: '/scan',
      icon: icons.DocumentScannerOutlinedIcon, // Remplacement de l'icône par NoteAddIcon
    },
    {
      id: 'decharge',
      title: 'E-decharge',
      type: 'item',
      url: '/decharge',
      icon: icons.NoteAddOutlined
    },
  ],
};

export default utilities;
