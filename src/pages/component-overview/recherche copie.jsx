import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

// Fonction pour générer un NNI aléatoire à 10 chiffres
const generateRandomNNI = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};


function DataTable({ data, searchQuery, onPreview }) {
  return (
    <Grid item xs={12}>
      <MainCard title="Search Results">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>NNI</TableCell>
              <TableCell>Numéro de titre</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Operateur</TableCell>
              <TableCell>Aperçu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((item) => {
                const searchTerm = searchQuery.toLowerCase();
                return (
                  item.requestId.toLowerCase().includes(searchTerm) ||
                  item.NNI.toLowerCase().includes(searchTerm) ||
                  item.Num_Titre.toLowerCase().includes(searchTerm) ||
                  item.DATE.toLowerCase().includes(searchTerm) ||
                  item.Operateur.toLowerCase().includes(searchTerm)
                );
              })
              .map((item) => (
                <TableRow key={item.requestId}>
                  <TableCell>{item.requestId}</TableCell>
                  <TableCell>{item.NNI}</TableCell>
                  <TableCell>{item.Num_Titre}</TableCell>
                  <TableCell>{item.DATE}</TableCell>
                  <TableCell>{item.Operateur}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => onPreview(item)} // Appelle fonction onPreview
                    >
                      Aperçu
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </MainCard>
    </Grid>
  );
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    {
      requestId: 'REQ-001',
      NNI: generateRandomNNI(),
      Num_Titre: 'TIT-1001',
      DATE: '2024-01-01',
      Operateur: 'Admin',
      pdfUrl: 'doc.pdf', 
    },
    {
      requestId: 'REQ-002',
      NNI: generateRandomNNI(),
      Num_Titre: 'TIT-1002',
      DATE: '2024-06-01',
      Operateur: 'JohnDoe',
      pdfUrl: 'doc.pdf', 
    },
    {
      requestId: 'REQ-003',
      NNI: generateRandomNNI(),
      Num_Titre: 'TIT-1003',
      DATE: '2024-03-01',
      Operateur: 'JaneSmith',
      pdfUrl: 'doc.pdf', 
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePreview = (item) => {
    setSelectedDocument(item);
    setOpen(true); // Ouvre la modal
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDocument(null);
  };

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Recherche par Request ID, NNI, Numéro de Titre, Date, or Operateur"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <DataTable data={data} searchQuery={searchQuery} onPreview={handlePreview} />
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Paper style={{ padding: '20px', margin: 'auto', maxWidth: '800px', height: '600px'}}>
          {selectedDocument && (
            <iframe
              src={selectedDocument.pdfUrl} // Chemin vers le PDF
              style={{ width: '100%', height: '100%' }}
              frameBorder="10"
            />
          )}
        </Paper>
      </Modal>
    </ComponentSkeleton>
  );
}
