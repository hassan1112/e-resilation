// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-1.png';
import AnimateButton from 'components/@extended/AnimateButton';

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems='center' spacing={2.5}>
        <CardMedia component='img' image={avatar} sx={{ width: 112 }} />
        <Stack alignItems='center'>
          <Typography variant='h5'>E-resilation</Typography>
          <Typography variant='h6' color='secondary'>
            E-resilation{' '}
          </Typography>
        </Stack>
        <AnimateButton>
          <Button
            component={Link}
            target='_blank'
            href='#'
            variant='contained'
            color='success'
            size='small'
          >
            titres
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
