// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  // title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Approval',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined,
    },
    {
      id: 'documentation',
      title: 'Lost Cards',
      type: 'item',
      url: '#',
      icon: icons.QuestionOutlined,
      external: true,
      target: true,
    },
  ],
};

export default support;
