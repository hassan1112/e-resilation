import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';

export default function StatResilation() {
  const [slot, setSlot] = useState('week');

  return (
    <>
      <Grid container alignItems='center' justifyContent='space-between'>
        <Grid item>

          <Typography variant="h5">Statistiques de résiliation</Typography>

        </Grid>
        <Grid item>
          <Stack direction='row' alignItems='center' spacing={0}>
            <Button
              size='small'
              onClick={() => setSlot('month')}
              color={slot === 'month' ? 'primary' : 'secondary'}
              variant={slot === 'month' ? 'outlined' : 'text'}
            >
              Mois
            </Button>
            <Button
              size='small'
              onClick={() => setSlot('week')}
              color={slot === 'week' ? 'primary' : 'secondary'}
              variant={slot === 'week' ? 'outlined' : 'text'}
            >
              Semaine
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart slot={slot} />
        </Box>
      </MainCard>
    </>
  );
}
