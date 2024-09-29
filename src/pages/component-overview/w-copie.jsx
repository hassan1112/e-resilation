import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, Paper, Typography, Popover, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Search, CheckCircle, Cancel } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generateRandomNNI = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

function DataTable({ data, searchQuery, onRowClick, hoveredRow, onMouseEnter, onMouseLeave }) {
    return (
        <Grid item xs={12}>
            <MainCard title="Search Results">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Request ID</TableCell>
                            <TableCell>NNI</TableCell>
                            <TableCell>Numéro de titre</TableCell>
                            <TableCell>Date d'ajout</TableCell>
                            <TableCell>Ajouté par</TableCell>
                            <TableCell>Statut</TableCell>
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
                                    item.dateAjout.toLowerCase().includes(searchTerm) ||
                                    item.ajoutPar.toLowerCase().includes(searchTerm)
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
                                    <TableCell>{item.NNI}</TableCell>
                                    <TableCell>{item.Num_Titre}</TableCell>
                                    <TableCell>{item.dateAjout}</TableCell>
                                    <TableCell>{item.ajoutPar}</TableCell>
                                    <TableCell>{item.status}</TableCell>
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
            dateAjout: '2024-01-01',
            ajoutPar: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
        },
        {
            requestId: 'REQ-002',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1002',
            dateAjout: '2024-06-01',
            ajoutPar: 'JohnDoe',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
        },
        {
            requestId: 'REQ-003',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1003',
            dateAjout: '2024-03-01',
            ajoutPar: 'JaneSmith',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
        },
    ]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRowClick = (item) => {
        setSelectedDocument(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDocument(null);
    };

    const handleValidate = () => {
        setConfirmDialogOpen(true); // Ouvrir le dialog de confirmation
    };

    const handleConfirmValidate = () => {
        setData((prevData) =>
            prevData.map((doc) =>
                doc.requestId === selectedDocument.requestId ? { ...doc, status: 'Validé' } : doc
            )
        );
        toast.success(`Le document ${selectedDocument?.requestId} a été validé avec succès !`);
        setConfirmDialogOpen(false);
        setOpen(false);
    };

    const handleRejectClick = (event) => {
        setPopoverAnchor(event.currentTarget);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitRejection = () => {
        setData((prevData) =>
            prevData.map((doc) =>
                doc.requestId === selectedDocument.requestId ? { ...doc, status: 'Rejeté' } : doc
            )
        );
        toast.error(`Le document ${selectedDocument?.requestId} a été rejeté avec succès !`);
        setPopoverAnchor(null);
        setOpen(false);
    };

    const handleMouseEnter = (requestId) => {
        setHoveredRow(requestId);
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Recherche par Request ID, NNI, Numéro de Titre, Date d'ajout, ou Ajouté par"
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

            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                BackdropProps={{
                    style: { backgroundColor: 'transparent' } // Rendre l'arrière-plan transparent
                }}
            >
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>
                        Êtes-vous sûr de vouloir valider le document {selectedDocument?.requestId} ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmValidate} color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>

            <Popover
                open={Boolean(popoverAnchor)}
                anchorEl={popoverAnchor}
                onClose={() => setPopoverAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <div style={{ padding: '20px', maxWidth: '300px' }}>
                    <Typography variant="subtitle1">Commentaire :</Typography>
                    <TextField fullWidth multiline rows={4} value={comment} onChange={handleCommentChange} placeholder="Ajouter un commentaire pour le rejet" />
                    <Button variant="contained" color="secondary" style={{ marginTop: '10px' }} onClick={handleSubmitRejection}>
                        Soumettre le rejet
                    </Button>
                </div>
            </Popover>

            <ToastContainer />
        </ComponentSkeleton>
    );
}
