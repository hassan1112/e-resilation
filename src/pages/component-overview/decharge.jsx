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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, Cancel, Search } from '@mui/icons-material';

// Document PDF
export const MyDocument = ({ documentInfo, personInfo }) => (
    <Document>
        <Page size="A4" style={{ padding: 20 }}>
            <View>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Récapitulatif de Décharge</Text>
                <Text style={{ fontSize: 14, marginBottom: 5 }}>Informations du Document :</Text>
                <Text>NNI du Document: {documentInfo.NNI}</Text>
                <Text>Numéro de Titre: {documentInfo.numTitre}</Text>
                <Text style={{ marginTop: 10 }}>Informations de la Personne :</Text>
                <Text>Nom: {personInfo.name}</Text>
                <Text>Prénom: {personInfo.firstName}</Text>
                <Text>NNI: {personInfo.NNI}</Text>
                <Text>Numéro de Téléphone: {personInfo.phone}</Text>
                <Text>Type de Document: {documentInfo.type}</Text>
            </View>
        </Page>
    </Document>
);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
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

const DataTable = ({ data, searchQuery, onRowClick, hoveredRow, onMouseEnter, onMouseLeave }) => {
    return (
        <Grid item xs={12}>
            <Paper style={{ padding: '20px', borderRadius: 10, backgroundColor: '#fff' }}>
                <Typography variant="h6" gutterBottom>
                    Tableau de Consultation
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Request ID</TableCell>
                            <TableCell>NNI titre</TableCell>
                            <TableCell>NNI représentant </TableCell>
                            <TableCell>Numéro de titre</TableCell>
                            <TableCell>téléphone</TableCell>
                            <TableCell>Nom </TableCell>
                            <TableCell>Type document</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .filter((item) => {
                                const searchTerm = searchQuery.toLowerCase();
                                return (
                                    (item.requestId && item.requestId.toLowerCase().includes(searchTerm)) ||
                                    (item.nni_titre && item.nni_titre.toLowerCase().includes(searchTerm)) ||
                                    (item.nni_representant && item.nni_representant.toLowerCase().includes(searchTerm)) ||
                                    (item.nomRepresentant && item.nomRepresentant.toLowerCase().includes(searchTerm)) ||
                                    (item.typeDocument && item.typeDocument.toLowerCase().includes(searchTerm))
                                );
                            })
                            .map((item) => (
                                <TableRow
                                    key={item.requestId}
                                    onClick={() => onRowClick(item)}
                                    onMouseEnter={() => onMouseEnter(item.requestId)}
                                    onMouseLeave={onMouseLeave}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: hoveredRow === item.requestId ? '#f5f5f5' : 'inherit',
                                    }}
                                >
                                    <TableCell>{item.requestId}</TableCell>
                                    <TableCell>{item.nni_titre}</TableCell>
                                    <TableCell>{item.nni_representant}</TableCell>
                                    <TableCell>{item.numeroTitre}</TableCell>
                                    <TableCell>{item.numeroTelephone}</TableCell>
                                    <TableCell>{item.nomRepresentant}</TableCell>
                                    <TableCell>{item.typeDocument}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    );
};

export default function DechargeFormulaire() {
    const [tabIndex, setTabIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [pdfData, setPdfData] = useState(null);

    const [documentType, setDocumentType] = useState('');
    const [documentNNI, setDocumentNNI] = useState('');
    const [documentNumTitre, setDocumentNumTitre] = useState('');
    const [personName, setPersonName] = useState('');
    const [personFirstName, setPersonFirstName] = useState('');
    const [personNNI, setPersonNNI] = useState('');
    const [personPhone, setPersonPhone] = useState('');

    const [data] = useState([
        {
            requestId: '001',
            nni_titre: '123456',
            nni_representant: '654321',
            numeroTitre: '789',
            numeroTelephone: '0123456789',
            nomRepresentant: 'Dupont',
            typeDocument: 'Passport'
        },
        {
            requestId: '002',
            nni_titre: '234567',
            nni_representant: '765432',
            numeroTitre: '456',
            numeroTelephone: '9876543210',
            nomRepresentant: 'Martin',
            typeDocument: 'CIN'
        },
        {
            requestId: '003',
            nni_titre: '345678',
            nni_representant: '876543',
            numeroTitre: '123',
            numeroTelephone: '0123456789',
            nomRepresentant: 'Durand',
            typeDocument: 'CIN'
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
        setDocumentNNI('');
        setDocumentNumTitre('');
        setPersonName('');
        setPersonFirstName('');
        setPersonNNI('');
        setPersonPhone('');
        setPdfData(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPdfData = {
            documentInfo: {
                NNI: documentNNI,
                numTitre: documentNumTitre,
                type: documentType,
            },
            personInfo: {
                name: personName,
                firstName: personFirstName,
                NNI: personNNI,
                phone: personPhone,
            },
        };

        setPdfData(newPdfData);
        handleOpen();
    };

    const handleValidate = () => {
        toast.success("Formulaire soumis avec succès!");
        handleClose();
    };

    const handleRejectClick = () => {
        toast.error("Annulation effectuée !");
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
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Paper elevation={3} style={{ borderRadius: 10, overflow: "hidden" }}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            variant="fullWidth"
                            style={{ marginBottom: '20px' }}
                        >
                            <Tab label="Formulaire de Décharge" />
                            <Tab label="Tableau de Consultation" />
                        </Tabs>

                        <TabPanel value={tabIndex} index={0}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Informations Document</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="NNI du Document"
                                            value={documentNNI}
                                            onChange={(e) => setDocumentNNI(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Numéro de Titre"
                                            value={documentNumTitre}
                                            onChange={(e) => setDocumentNumTitre(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Type de Document</InputLabel>
                                            <Select value={documentType} onChange={(e) => setDocumentType(e.target.value)} >
                                                <MenuItem value="Passport">Passport</MenuItem>
                                                <MenuItem value="CIN">CIN</MenuItem>
                                                <MenuItem value="Permis">Permis</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Informations Personne</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Nom"
                                            value={personName}
                                            onChange={(e) => setPersonName(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Prénom"
                                            value={personFirstName}
                                            onChange={(e) => setPersonFirstName(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="NNI"
                                            value={personNNI}
                                            onChange={(e) => setPersonNNI(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Numéro de Téléphone"
                                            value={personPhone}
                                            onChange={(e) => setPersonPhone(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary">
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
                                        placeholder="Recherche par Request ID, NNI, Numéro de Titre, Date, ou Opérateur"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
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
                            <PDFViewer style={{ width: '100%', height: '80%', border: 'none' }}>
                                <MyDocument
                                    documentInfo={pdfData.documentInfo}
                                    personInfo={pdfData.personInfo}
                                />
                            </PDFViewer>
                            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={handleValidate} startIcon={<CheckCircle />}>
                                        Valider
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="error" onClick={handleRejectClick} startIcon={<Cancel />}>
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
