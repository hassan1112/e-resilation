import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, Paper, Typography, Popover, Snackbar } from '@mui/material';
import { Search, CheckCircle, Cancel } from '@mui/icons-material';  // Import des icônes
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

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
                            <TableCell>Date</TableCell>
                            <TableCell>Operateur</TableCell>
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
                                    item.DATE.toLowerCase().includes(searchTerm) ||
                                    item.Operateur.toLowerCase().includes(searchTerm)
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
                                        backgroundColor: hoveredRow === item.requestId ? '#f5f5f5' : 'inherit', // Change la couleur de fond au survol
                                    }}
                                >
                                    <TableCell>{item.requestId}</TableCell>
                                    <TableCell>{item.NNI}</TableCell>
                                    <TableCell>{item.Num_Titre}</TableCell>
                                    <TableCell>{item.DATE}</TableCell>
                                    <TableCell>{item.Operateur}</TableCell>
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
            DATE: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
        },
        {
            requestId: 'REQ-002',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1002',
            DATE: '2024-06-01',
            Operateur: 'JohnDoe',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
        },
        {
            requestId: 'REQ-003',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1003',
            DATE: '2024-03-01',
            Operateur: 'JaneSmith',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
        },
    ]);

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
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
        setData((prevData) =>
            prevData.map((doc) =>
                doc.requestId === selectedDocument.requestId ? { ...doc, status: 'Validé' } : doc
            )
        );
        setShowNotification(true);
        setOpen(false);
    };

    const handleRejectClick = (event) => {
        setPopoverAnchor(event.currentTarget);
        setIsRejected(true);
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
        setShowNotification(true);
        setPopoverAnchor(null);
        setOpen(false);
    };

    const handleNotificationClose = () => {
        setShowNotification(false);
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
                                style={{ width: '100%', height: '86%', border: 'none' }}
                                title={`Aperçu du document ${selectedDocument.Num_Titre}`}
                            />
                            <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleValidate}
                                        startIcon={<CheckCircle />} // Icône pour le bouton Valider
                                    >
                                        Valider
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleRejectClick}
                                        startIcon={<Cancel />} // Icône pour le bouton Rejeter
                                    >   
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
                    horizontal: 'right',
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
                        color="secondary"
                        style={{ marginTop: '10px' }}
                        onClick={handleSubmitRejection}
                    >
                        Soumettre le rejet
                    </Button>
                </div>
            </Popover>

            <Snackbar
                open={showNotification}
                onClose={handleNotificationClose}
                message={
                    isRejected
                        ? `Le document ${selectedDocument?.requestId} a été rejeté avec succès !`
                        : `Le document ${selectedDocument?.requestId} a été validé avec succès !`
                }
                autoHideDuration={3000}
            />
        </ComponentSkeleton>
    );
}
