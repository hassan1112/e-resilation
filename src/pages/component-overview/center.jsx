import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { PDFViewer, Page, Text, View, Document } from '@react-pdf/renderer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, Cancel, Search } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DataTable = ({
  data,
  searchQuery,
  onRowClick,
  hoveredRow,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Grid item xs={12}>
      <Paper
        style={{ padding: '20px', borderRadius: 10, backgroundColor: '#fff' }}
      >
        <Typography variant='h6' gutterBottom>
          Tableau de Consultation
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CAU code</TableCell>
              <TableCell>Nom </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Chef de centre</TableCell>
              <TableCell>numero Telphone </TableCell>
              <TableCell>Province </TableCell>
              {/* <TableCell>Type document</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((item) => {
                const searchTerm = searchQuery.toLowerCase();
                return (
                  (item.codeCAU &&
                    item.codeCAU.toLowerCase().includes(searchTerm)) ||
                  (item.CAUNom &&
                    item.CAUNom.toLowerCase().includes(searchTerm)) ||
                  (item.address &&
                    item.address.toLowerCase().includes(searchTerm)) ||
                  (item.ccTelephone &&
                    item.ccTelephone.toLowerCase().includes(searchTerm)) ||
                  (item.cc && item.cc.toLowerCase().includes(searchTerm)) ||
                  (item.province &&
                    item.province.toLowerCase().includes(searchTerm))
                );
              })
              .map((item) => (
                <TableRow
                  key={item.codeCAU}
                  onClick={() => onRowClick(item)}
                  onMouseEnter={() => onMouseEnter(item.codeCAU)}
                  onMouseLeave={onMouseLeave}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      hoveredRow === item.requestId ? '#f5f5f5' : 'inherit',
                  }}
                >
                  <TableCell>{item.codeCAU}</TableCell>
                  <TableCell>{item.CAUNom}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.cc}</TableCell>
                  <TableCell>{item.ccTelephone}</TableCell>

                  <TableCell>{item.province}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

export default function CenterForm() {
  const [tabIndex, setTabIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  const [codeCAU, setcodeCAU] = useState('');
  const [CAUNom, setCAUNom] = useState('');
  const [address, setaddress] = useState('');
  const [ccTelephone, setccTelephone] = useState('');
  const [cc, setcc] = useState('');
  const [province, setprovince] = useState('');
  const [data] = useState([
    {
      codeCAU: '102003034',
      CAUNom: 'Farcha',
      address: '1er arr Farcha Ndjamena',
      ccTelephone: '688888884',
      cc: 'Mht Bichara',
      province: 'Ndjamena',
    },
    {
      codeCAU: '10200302',
      CAUNom: '8em',
      address: '8em  Ndjamna',
      ccTelephone: '668888883',
      cc: 'Asma Nur',
      province: 'Njdmena',
    },
    {
      codeCAU: '2002937737',
      CAUNom: 'klemat',
      address: 'Klemat Ndjamena Tchad',
      ccTelephone: '65555553',
      cc: 'Mht Abakar',
      province: 'Njdmaena',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Ouvrir la modal
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setcodeCAU('');
    setCAUNom('');
    setaddress('');
    setccTelephone('');
    setcc('');
    setprovince('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCenter = {
      codeCAU: codeCAU,
      CAUNom: CAUNom,
      address: address,
      ccTelephone: ccTelephone,
      cc: cc,
      province: province,
    };
    //
    // setPdfData(newCenter); Api call to submit form data
    handleOpen();
  };

  const handleValidate = () => {
    toast.success('Formulaire soumis avec succès!');
    handleClose();
  };

  const handleRejectClick = () => {
    toast.error('Annulation effectuée !');
    handleClose();
  };

  const handleRowClick = (item) => {
    console.log('Row clicked:', item);
  };

  const handleMouseEnter = (requestId) => {
    setHoveredRow(requestId);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 4 }} justifyContent='center'>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} style={{ borderRadius: 10, overflow: 'hidden' }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              centered
              variant='fullWidth'
              style={{ marginBottom: '20px' }}
            >
              <Tab label='Formulaire de CAU' />
              <Tab label='Tableau de Consultation' />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Informations de CAU</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label='Nom'
                      value={CAUNom}
                      onChange={(e) => setCAUNom(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label='Code de CAU'
                      value={codeCAU}
                      onChange={(e) => setcodeCAU(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label='Address'
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label='Province'
                      value={province}
                      onChange={(e) => setprovince(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label='cc'
                      value={cc}
                      onChange={(e) => setcc(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label='Numéro de Téléphone du CC'
                      value={ccTelephone}
                      onChange={(e) => setccTelephone(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary'>
                      Soumettre
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Recherche par code CAU, nom, cc'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <IconButton>
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <DataTable
                  data={data}
                  searchQuery={searchQuery}
                  onRowClick={handleRowClick}
                  hoveredRow={hoveredRow}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={handleClose}>
        <Paper style={{ margin: 'auto', maxWidth: '900px', height: '750px' }}>
          {pdfData && (
            <>
              <PDFViewer
                style={{ width: '100%', height: '80%', border: 'none' }}
              >
                <MyDocument
                  documentInfo={pdfData.documentInfo}
                  personInfo={pdfData.personInfo}
                />
              </PDFViewer>
              <Grid
                container
                spacing={2}
                justifyContent='center'
                style={{ marginTop: '20px' }}
              >
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleValidate}
                    startIcon={<CheckCircle />}
                  >
                    Valider
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={handleRejectClick}
                    startIcon={<Cancel />}
                  >
                    Annuler
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Modal>

      <ToastContainer />
    </>
  );
}
