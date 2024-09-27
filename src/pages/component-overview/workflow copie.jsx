import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, Paper, Typography, Popover, Snackbar } from '@mui/material';
import { Search } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

const generateRandomNNI = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

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
                                        <Button variant="contained" onClick={() => onPreview(item)}>
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
        },
    ]);

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [isRejected, setIsRejected] = useState(false); // Nouveau état pour gérer le type de notification

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePreview = (item) => {
        setSelectedDocument(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDocument(null);
    };

    const handleValidate = () => {
        setIsRejected(false); // Indique que c'est une validation
        setShowNotification(true); // Affiche la notification
        setOpen(false);
    };

    const handleRejectClick = (event) => {
        setPopoverAnchor(event.currentTarget);
        setIsRejected(true); // Indique que c'est un rejet
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitRejection = () => {
        setShowNotification(true); // Affiche la notification
        setPopoverAnchor(null); // Fermer le pop-up
        setOpen(false); // Fermer la modale principale
    };

    const handleNotificationClose = () => {
        setShowNotification(false);
    };

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Recherche par Request ID, NNI, Numéro de Titre, Date, ou Operateur"
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
                <DataTable data={data} searchQuery={searchQuery} onPreview={handlePreview} />
            </Grid>

            <Modal open={open} onClose={handleClose}>
                <Paper style={{  margin: 'auto', maxWidth: '900px', height: '750px' }}>
                    {selectedDocument && (
                        <>
                            <iframe src={selectedDocument.pdfUrl} style={{ width: '100%', height: '86%', border: 'none'}} />
                            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                                <Grid item>
                                    <Button variant="contained" color="success" onClick={handleValidate}>
                                        Valider
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="error" onClick={handleRejectClick}>
                                        Rejeter
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
                onClose={() => setPopoverAnchor(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ padding: '20px', maxWidth: '300px' }}>
                    <Typography variant="subtitle1">Commentaire :</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Ajouter un commentaire pour le rejet"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        onClick={handleSubmitRejection}
                    >
                        Soumettre le rejet
                    </Button>
                </div>
            </Popover>

            {/* Snackbar pour la notification de succès */}
            <Snackbar
                open={showNotification}
                onClose={handleNotificationClose}
                message={
                    isRejected
                        ? `Le document ${selectedDocument?.requestId} a été rejeté avec succès !`
                        : `Le document ${selectedDocument?.requestId} a été validé avec succès !`
                }
                autoHideDuration={3000} // Délai de fermeture automatique
            />
        </ComponentSkeleton>
    );
}
