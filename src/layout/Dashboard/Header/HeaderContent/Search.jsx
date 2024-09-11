// material-ui
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import logo from './logos.jpeg'; // replace with the actual path to your logo image
import Typography from '@mui/material/Typography';

// assets
import SearchOutlined from '@ant-design/icons/SearchOutlined';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function Search() {
  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ mr: { xs: 2, md: 4 }, mb: { xs: 2, md: 0 } }}>
          <img src={logo} alt="Logo" height={80} width={80} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h1" component="h1">
            Agence nationale de titre sécurisé
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
