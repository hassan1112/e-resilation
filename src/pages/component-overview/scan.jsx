import React, { useState } from "react";
import { Grid, Tabs, Tab, Typography, Box, Button, Paper, Modal, Popover, TextField, Switch } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { CloudUpload, Scanner, Cancel, CheckCircle } from "@mui/icons-material";
import ComponentSkeleton from "./ComponentSkeleton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function ScanAndUploadComponent() {
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [open, setOpen] = useState(false);
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [nni, setNni] = useState("");
    const [numeroTitre, setNumeroTitre] = useState("");
    const [isArchived, setIsArchived] = useState(false); // État pour le switch
    const userName = "Nom de l'utilisateur"; // Remplacez par le nom de l'utilisateur actuel
    const currentDate = new Date().toLocaleDateString(); // Date actuelle

    const { getRootProps, getInputProps } = useDropzone({
        accept: "application/pdf, image/*",
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setSelectedDocument({ pdfUrl: URL.createObjectURL(file), Num_Titre: file.name });
            setOpen(true);
        },
    });

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleClose = () => setOpen(false);

    const handleValidate = (event) => {
        setPopoverAnchor(event.currentTarget);
    };

    const handleRejectClick = () => {
        toast.error("Document annulé !");
        setOpen(false);
        setSelectedDocument(null);
    };

    const handleSubmitValidation = () => {
        toast.success("Document validé !");
        setPopoverAnchor(null);
        setOpen(false);
        // Logique de soumission de validation avec NNI et numéro de titre
        console.log("Validé :", { nni, numeroTitre, isArchived, userName, currentDate });
    };

    const handlePopoverClose = () => {
        setPopoverAnchor(null);
        setNni("");
        setNumeroTitre("");
        setIsArchived(false); // Réinitialiser le switch
    };

    return (
        <ComponentSkeleton>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} style={{ borderRadius: 10, overflow: "hidden" }}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            variant="fullWidth"
                        >
                            <Tab label="Numériser un document" />
                            <Tab label="Téléverser un document" />
                        </Tabs>

                        <TabPanel value={tabIndex} index={0}>
                            <Paper
                                elevation={2}
                                style={{
                                    margin: "20px",
                                    padding: "30px",
                                    textAlign: "center",
                                    border: "1px #aaa",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <Scanner style={{ fontSize: 60, color: "#3f51b5" }} />
                                <Typography variant="h6" gutterBottom>
                                    Numériser un document avec le scanner
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Cliquez sur le bouton ci-dessous pour démarrer le scan
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginTop: "20px" }}
                                    onClick={() => {
                                        // Logique de numérisation ici
                                    }}
                                >
                                    Démarrer le Scan
                                </Button>
                            </Paper>
                        </TabPanel>

                        <TabPanel value={tabIndex} index={1}>
                            <Paper
                                elevation={2}
                                style={{
                                    margin: "20px",
                                    padding: "30px",
                                    textAlign: "center",
                                    border: "1px  #aaa",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <div {...getRootProps()} style={{ cursor: "pointer" }}>
                                    <input {...getInputProps()} />
                                    <CloudUpload style={{ fontSize: 60, color: "#3f51b5" }} />
                                    <Typography variant="h6" gutterBottom>
                                        Glissez et déposez vos fichiers ici
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ou cliquez pour sélectionner les fichiers
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: "20px" }}
                                    >
                                        Sélectionner des fichiers
                                    </Button>
                                </div>
                            </Paper>
                        </TabPanel>
                    </Paper>

                    <Modal open={open} onClose={handleClose}>
                        <Paper style={{ margin: 'auto', maxWidth: '900px', height: '750px' }}>
                            {selectedDocument && (
                                <>
                                    <iframe
                                        src={selectedDocument.pdfUrl}
                                        style={{ width: '100%', height: '80%', border: 'none' }}
                                        title={`Aperçu du document ${selectedDocument.Num_Titre}`}
                                    />
                                    <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                                        <Grid item>
                                            <Button variant="contained" color="primary" onClick={handleValidate} startIcon={<CheckCircle />}>
    
                                                Confirmer
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

                    <Popover
                        open={Boolean(popoverAnchor)}
                        anchorEl={popoverAnchor}
                        onClose={handlePopoverClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <div style={{ padding: '20px', maxWidth: '300px' }}>
                            <Typography variant="subtitle1">Informations :</Typography>
                            <TextField fullWidth margin="normal" value={nni} onChange={(e) => setNni(e.target.value)} placeholder="NNI" />
                            <TextField fullWidth margin="normal" value={numeroTitre} onChange={(e) => setNumeroTitre(e.target.value)} placeholder="Numéro de titre" />
                            <Grid container alignItems="center">
                                <Typography variant="body1" style={{ marginRight: 8 }}>Déjà archivé :</Typography>
                                <Switch checked={isArchived} onChange={() => setIsArchived(!isArchived)} />
                            </Grid>
                            <Button variant="contained" color="secondary" style={{ marginTop: '10px' }} onClick={handleSubmitValidation}>
                                Soumettre
                            </Button>
                        </div>
                    </Popover>

                    <ToastContainer />
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
}
