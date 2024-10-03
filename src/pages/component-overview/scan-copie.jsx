import React, { useState } from "react";
import { Grid, Tabs, Tab, Typography, Box, Button, Paper, Modal, Popover, TextField, Switch, MenuItem, FormControl, InputLabel, Select, FormControlLabel } from "@mui/material";
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
    const [isArchived, setIsArchived] = useState(false);
    const [documentType, setDocumentType] = useState("");
    const userName = "Nom de l'utilisateur";
    const currentDate = new Date().toLocaleDateString();

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
        console.log("Validé :", { nni, numeroTitre, documentType, isArchived });
    };

    const handlePopoverClose = () => {
        setPopoverAnchor(null);
        setNni("");
        setNumeroTitre("");
        setDocumentType("");
        setIsArchived(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const isFormValid = nni.trim() !== "" && numeroTitre.trim() !== "" && documentType.trim() !== "";


    return (
        <ComponentSkeleton>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} style={{ borderRadius: 10, overflow: "hidden" }}>
                            {/* Formulaire d'initiation de demande */}
                            <Paper
                                elevation={0}
                                style={{
                                    margin: "20px",
                                    padding: "30px",
                                    textAlign: "center",
                                    border: "1px #aaa",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="NNI"
                                            value={nni}
                                            onChange={(e) => setNni(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Numéro de titre"
                                            value={numeroTitre}
                                            onChange={(e) => setNumeroTitre(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Type de Document</InputLabel>
                                            <Select
                                                value={documentType}
                                                onChange={(e) => setDocumentType(e.target.value)}
                                                required
                                            >
                                                <MenuItem value="Passport">Passport</MenuItem>
                                                <MenuItem value="CIN">CIN</MenuItem>
                                                <MenuItem value="Permis">Permis</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} container alignItems="center">
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isArchived}
                                                    onChange={() => setIsArchived(!isArchived)}
                                                />
                                            }
                                            label="Déjà résilié"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                variant="fullWidth"
                            >
                                <Tab label="Scanner le document" />
                                <Tab label="Importer le document" />
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
                                        Scanner le document pour initier la demande
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Cliquez sur le bouton ci-dessous pour démarrer le scan
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ marginTop: "20px" }}
                                        type="submit"
                                        disabled={!isFormValid} // Désactiver le bouton si les champs requis ne sont pas remplis

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
                                        border: "1px #aaa",
                                        backgroundColor: "#f9f9f9",
                                    }}
                                >
                                    <div {...getRootProps()} style={{ cursor: "pointer" }}>
                                        <input {...getInputProps()} />
                                        <CloudUpload style={{ fontSize: 60, color: "#3f51b5" }} />
                                        <Typography variant="h6" gutterBottom>
                                            Glissez et déposez vos fichiers ici pour initier la demande
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ou cliquez pour sélectionner les fichiers
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginTop: "20px" }}
                                            type="submit"
                                            disabled={!isFormValid} // Désactiver le bouton si les champs requis ne sont pas remplis

                                        >
                                            Sélectionner des fichiers
                                        </Button>
                                    </div>
                                </Paper>
                            </TabPanel>
                        </Paper>

                        <Modal open={open} onClose={handleClose}>
                            <Paper style={{ margin: "auto", maxWidth: "900px", height: "750px" }}>
                                {selectedDocument && (
                                    <>
                                        <iframe
                                            src={selectedDocument.pdfUrl}
                                            style={{ width: "100%", height: "80%", border: "none" }}
                                            title={`Aperçu du document ${selectedDocument.Num_Titre}`}
                                        />
                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                            style={{ marginTop: "20px" }}
                                        >
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleValidate}
                                                    startIcon={<CheckCircle />}
                                                >
                                                    Confirmer
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
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

                        <Popover
                            open={Boolean(popoverAnchor)}
                            anchorEl={popoverAnchor}
                            onClose={handlePopoverClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                        >
                            <div style={{ padding: "20px", maxWidth: "300px" }}>
                                <Typography variant="subtitle1">
                                    Veuillez vérifier les informations :
                                </Typography>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    value={nni}
                                    onChange={(e) => setNni(e.target.value)}
                                    placeholder="NNI"
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    value={numeroTitre}
                                    onChange={(e) => setNumeroTitre(e.target.value)}
                                    placeholder="Numéro de titre"
                                />
                                <Grid container alignItems="center">
                                    <Typography variant="body1" style={{ marginRight: 8 }}>
                                        Déjà résilié :
                                    </Typography>
                                    <Switch
                                        checked={isArchived}
                                        onChange={() => setIsArchived(!isArchived)}
                                    />
                                </Grid>
                                <Button variant="contained" color="primary" onClick={handleSubmitValidation}>
                                    Soumettre
                                </Button>
                            </div>
                        </Popover>

                        <ToastContainer />
                    </Grid>
                </Grid>
            </form>

        </ComponentSkeleton>
    );
}
