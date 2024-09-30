import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, Paper, Typography, Popover, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Search, CheckCircle, Cancel } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generateRandomNNI = () => Math.floor(1000000000 + Math.random() * 9000000000).toString();

// Composant pour afficher un point coloré selon le statut
function OrderStatus({ status }) {
    let color;
    let title;

    switch (status) {
        case 'En attente':
            color = 'orange';
            title = 'En attente';
            break;
        case 'Validé':
            color = 'green';
            title = 'Validé';
            break;
        case 'Rejeté':
            color = 'red';
            title = 'Rejeté';
            break;
        default:
            color = 'grey';
            title = 'Inconnu';
    }

    return (
        <Grid container direction="row" alignItems="center">
            <span
                style={{
                    display: 'inline-block',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginRight: 8,
                }}
            ></span>
            <Typography>{title}</Typography>
        </Grid>
    );
}
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
                            <TableCell>Centre</TableCell> 
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
                                    item.ajoutPar.toLowerCase().includes(searchTerm) ||
                                    item.centre.toLowerCase().includes(searchTerm) // Filtrage par centre
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
                                    <TableCell>
                                        <OrderStatus status={item.status} />
                                    </TableCell>
                                    <TableCell>{item.centre}</TableCell> {/* Nouvelle cellule ajoutée */}
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
        centre: 'Klemat',
    },
    {
        requestId: 'REQ-002',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1002',
        dateAjout: '2024-06-01',
        ajoutPar: 'JohnDoe',
        pdfUrl: 'doc.pdf',
        status: 'En attente',
        centre: 'Moundou',
    },
    {
        requestId: 'REQ-003',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1003',
        dateAjout: '2024-03-01',
        ajoutPar: 'JaneSmith',
        pdfUrl: 'doc.pdf',
        status: 'En attente',
        centre: 'Farcha',
    },
    {
        requestId: 'REQ-004',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1004',
        dateAjout: '2024-04-15',
        ajoutPar: 'Admin',
        pdfUrl: 'doc.pdf',
        status: 'Validé',
        centre: 'Chagoua',
    },
    {
        requestId: 'REQ-005',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1005',
        dateAjout: '2024-02-12',
        ajoutPar: 'AliceBrown',
        pdfUrl: 'doc.pdf',
        status: 'Rejeté',
        centre: 'Dembe',
    },
    {
        requestId: 'REQ-006',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1006',
        dateAjout: '2024-07-21',
        ajoutPar: 'BobGreen',
        pdfUrl: 'doc.pdf',
        status: 'En attente',
        centre: 'Dembe',
    },
    {
        requestId: 'REQ-007',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1007',
        dateAjout: '2024-05-10',
        ajoutPar: 'CharlieBlack',
        pdfUrl: 'doc.pdf',
        status: 'Validé',
        centre: 'DSIS',
    },
    {
        requestId: 'REQ-008',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1008',
        dateAjout: '2024-09-05',
        ajoutPar: 'DanaWhite',
        pdfUrl: 'doc.pdf',
        status: 'Rejeté',
        centre: 'DSIS',
    },
    {
        requestId: 'REQ-009',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1009',
        dateAjout: '2024-11-19',
        ajoutPar: 'EricYellow',
        pdfUrl: 'doc.pdf',
        status: 'En attente',
        centre: 'DSIS',
    },
    {
        requestId: 'REQ-010',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1010',
        dateAjout: '2024-12-25',
        ajoutPar: 'Admin',
        pdfUrl: 'doc.pdf',
        status: 'Validé',
        centre: 'Klemat',
    },
    {
        requestId: 'REQ-011',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1011',
        dateAjout: '2024-08-02',
        ajoutPar: 'JohnDoe',
        pdfUrl: 'doc.pdf',
        status: 'Rejeté',
        centre: 'Klemat',
    },
    {
        requestId: 'REQ-012',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1012',
        dateAjout: '2024-10-17',
        ajoutPar: 'JaneSmith',
        pdfUrl: 'doc.pdf',
        status: 'En attente',
        centre: 'Klemat',
    },
    {
        requestId: 'REQ-013',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1013',
        dateAjout: '2024-04-09',
        ajoutPar: 'AliceBrown',
        pdfUrl: 'doc.pdf',
        status: 'Validé',
        centre: 'Goudji',
    },
    {
        requestId: 'REQ-014',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1014',
        dateAjout: '2024-06-30',
        ajoutPar: 'CharlieBlack',
        pdfUrl: 'doc.pdf',
        status: 'Rejeté',
        centre: 'Goudji',
    },
    {
        requestId: 'REQ-015',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1015',
        dateAjout: '2024-05-18',
        ajoutPar: 'BobGreen',
        pdfUrl: 'doc.pdf',
        status: 'Validé',
        centre: 'Goudji',
    },
    {
        requestId: 'REQ-016',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1016',
        dateAjout: '2024-01-21',
        ajoutPar: 'DanaWhite',
        pdfUrl: 'doc.pdf',
        status: 'Rejeté',
        centre: 'Moursal',
    },
    {
        requestId: 'REQ-017',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1017',
        dateAjout: '2024-03-11',
        ajoutPar: 'EricYellow',
        pdfUrl: 'doc.pdf',
        status: 'En attente',
        centre: 'Klemat',
    },
    {
        requestId: 'REQ-018',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1018',
        dateAjout: '2024-02-27',
        ajoutPar: 'Admin',
        pdfUrl: 'doc.pdf',
        status: 'Validé',
        centre: 'Amriguebe',
    },
    {
        requestId: 'REQ-019',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1019',
        dateAjout: '2024-07-15',
        ajoutPar: 'AliceBrown',
        pdfUrl: 'doc.pdf',
        status: 'Rejeté',
        centre: 'Diguel',
    },
    {
        requestId: 'REQ-020',
        NNI: generateRandomNNI(),
        Num_Titre: 'TIT-1020',
        dateAjout: '2024-08-22',
        ajoutPar: 'JohnDoe',
        pdfUrl: 'doc.pdf',
        status: 'En attente',
        centre: 'Farcha',
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
