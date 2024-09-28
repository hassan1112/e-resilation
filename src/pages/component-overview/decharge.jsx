import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography, Modal } from '@mui/material';
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import ComponentSkeleton from './ComponentSkeleton';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// Document PDF
const MyDocument = ({ documentInfo, personInfo }) => (
    <Document>
        <Page size="A4" style={{ padding: 20 }}>
            <View>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Récapitulatif de Décharge</Text>
                <Text style={{ fontSize: 14, marginBottom: 5 }}>Informations du Document :</Text>
                <Text>NNI du Document: {documentInfo.documentNNI}</Text>
                <Text>Numéro de Titre: {documentInfo.documentNumTitre}</Text>
                <Text style={{ marginTop: 10 }}>Informations de la Personne :</Text>
                <Text>Nom: {personInfo.name}</Text>
                <Text>Prénom: {personInfo.firstName}</Text>
                <Text>NNI: {personInfo.nni}</Text>
                <Text>Numéro de Téléphone: {personInfo.phone}</Text>
            </View>
        </Page>
    </Document>
);

export default function DocumentDischarge() {
    const [documentNNI, setDocumentNNI] = useState('');
    const [documentNumTitre, setDocumentNumTitre] = useState('');
    const [personName, setPersonName] = useState('');
    const [personFirstName, setPersonFirstName] = useState('');
    const [personNNI, setPersonNNI] = useState('');
    const [personPhone, setPersonPhone] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [pdfData, setPdfData] = useState(null); // État pour les données du PDF

    const handleSubmit = (event) => {
        event.preventDefault();
        // Préparer les données pour le PDF
        const pdfDocument = {
            documentInfo: {
                documentNNI,
                documentNumTitre,
            },
            personInfo: {
                name: personName,
                firstName: personFirstName,
                nni: personNNI,
                phone: personPhone,
            },
        };
        setPdfData(pdfDocument); // Stocker les données pour le PDF
        setOpenModal(true); // Ouvrir le modal
    };

    const handleClose = () => {
        setOpenModal(false);
        // Réinitialiser les champs si nécessaire
        setDocumentNNI('');
        setDocumentNumTitre('');
        setPersonName('');
        setPersonFirstName('');
        setPersonNNI('');
        setPersonPhone('');
        setPdfData(null); // Réinitialiser les données du PDF
    };

    const handleValidate = () => {
        // Logique de validation ici
        toast.success("Document validé !"); // Notification de succès
        handleClose(); // Fermer le modal
    };

    const handleRejectClick = () => {
        // Logique de rejet ici
        toast.error("Document rejeté !"); // Notification d'erreur
        handleClose(); // Fermer le modal
    };

    return (
        <ComponentSkeleton>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} style={{ padding: '20px', borderRadius: 10 }}>
                        <Typography variant="h5" gutterBottom>
                            Décharge de Document
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h6" gutterBottom>
                                Informations du Document
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="NNI du Document"
                                value={documentNNI}
                                onChange={(e) => setDocumentNNI(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Numéro de Titre"
                                value={documentNumTitre}
                                onChange={(e) => setDocumentNumTitre(e.target.value)}
                                required
                            />

                            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                                Informations de la Personne qui Décharge
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nom"
                                value={personName}
                                onChange={(e) => setPersonName(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Prénom"
                                value={personFirstName}
                                onChange={(e) => setPersonFirstName(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="NNI"
                                value={personNNI}
                                onChange={(e) => setPersonNNI(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Numéro de Téléphone"
                                value={personPhone}
                                onChange={(e) => setPersonPhone(e.target.value)}
                                required
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ marginTop: '20px' }}
                            >
                                Soumettre
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            {/* Modal pour afficher le PDF */}
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
                                        Rejeter
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Paper>
            </Modal>

            {/* Conteneur pour les notifications */}
            <ToastContainer />
        </ComponentSkeleton>
    );
}
