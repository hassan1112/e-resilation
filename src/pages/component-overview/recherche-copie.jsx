import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, Paper, Typography, Popover, Snackbar } from '@mui/material';
import { Search } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

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
                                    item.addedDate.toLowerCase().includes(searchTerm) ||
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
                                        backgroundColor: hoveredRow === item.requestId ? '#f5f5f5' : 'inherit',
                                    }}
                                >
                                    <TableCell>{item.requestId}</TableCell>
                                    <TableCell>{item.NNI}</TableCell>
                                    <TableCell>{item.Num_Titre}</TableCell>
                                    <TableCell>{item.addedDate}</TableCell>
                                    <TableCell>{item.Operateur}</TableCell>
                                    <TableCell>
                                        <OrderStatus status={item.status} />
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
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'Rejeté',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-002',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'Validé',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-003',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'Validé',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-004',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'Rejeté',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-005',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'Validé',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-006',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'Validé',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-007',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-008',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'Validé',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-009',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1001',
            addedDate: '2024-01-01',
            Operateur: 'Admin',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-0010',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1002',
            addedDate: '2024-06-01',
            Operateur: 'JohnDoe',
            pdfUrl: 'doc.pdf',
            status: 'Validé',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        },
        {
            requestId: 'REQ-0011',
            NNI: generateRandomNNI(),
            Num_Titre: 'TIT-1003',
            addedDate: '2024-03-01',
            Operateur: 'JaneSmith',
            pdfUrl: 'doc.pdf',
            status: 'En attente',
            validatedBy: null,
            validationDate: null,
            rejectedBy: null,
            rejectionDate: null,
            rejectionComment: null,
        }
    ]);

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
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
                doc.requestId === selectedDocument.requestId
                    ? { ...doc, status: 'Validé', validatedBy: 'UtilisateurX', validationDate: new Date().toLocaleDateString() }
                    : doc
            )
        );
        setShowNotification(true);
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
                doc.requestId === selectedDocument.requestId
                    ? { ...doc, status: 'Rejeté', rejectedBy: 'UtilisateurY', rejectionDate: new Date().toLocaleDateString(), rejectionComment: comment }
                    : doc
            )
        );
        setShowNotification(true);
        setPopoverAnchor(null);
        setOpen(false);
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
                <DataTable
                    data={data}
                    searchQuery={searchQuery}
                    onRowClick={handleRowClick}
                    hoveredRow={hoveredRow}
                    onMouseEnter={(requestId) => setHoveredRow(requestId)}
                    onMouseLeave={() => setHoveredRow(null)}
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
                            <Grid container spacing={2} style={{ padding: '20px' }}>
                                <Grid item xs={12}>
                                    <Typography>Ajouté par : {selectedDocument.Operateur}</Typography>
                                    <Typography>Date : {selectedDocument.addedDate}</Typography>
                                    <Typography>Commentaire : {selectedDocument.rejectionComment || 'Aucun commentaire'}</Typography>
                                    <Typography>Statut : {selectedDocument.status}</Typography>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Paper>
            </Modal>
        </ComponentSkeleton>
    );
}
