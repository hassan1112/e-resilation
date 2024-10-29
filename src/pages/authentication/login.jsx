import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';
import logo from '../../layout/Dashboard/Header/HeaderContent/logos.jpeg';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/dashboard/default'); // Redirect to /dashboard/default when button is clicked
  };

  return (
    <AuthWrapper>
      {/* Centering the logo */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '10vh', // Adjust the height as needed
          mb: { xs: 2, md: 0 },
        }}
      >
        <img src={logo} alt='Logo' height={100} width={100} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='baseline'
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography
              component={Link}
              to='/dashboard/default/'
              variant='body1'
              sx={{ textDecoration: 'none' }}
              color='primary'
            ></Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin onLoginClick={handleLoginClick} />{' '}
          {/* Pass the handler to AuthLogin */}
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
