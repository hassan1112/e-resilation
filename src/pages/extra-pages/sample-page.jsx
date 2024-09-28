import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleTwoTone';
import BlockIcon from '@mui/icons-material/BlockOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import MainCard from 'components/MainCard';

export default function ConsultationTable() {
  const handleApprove = (requestId) => {
    console.log(`Approve request ${requestId}`);
  };

  const handleBlock = (requestId) => {
    console.log(`Block request ${requestId}`);
  };

  const handleReject = (requestId) => {
    console.log(`Reject request ${requestId}`);
  };

  return (
    <MainCard title="Consultation Requests">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>NNI</TableCell>
              <TableCell>Numéro de Titre</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultationData.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell>{request.requestId}</TableCell>
                <TableCell>{request.nni}</TableCell>
                <TableCell>{request.titleNumber}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleApprove(request.requestId)}>
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton onClick={() => handleBlock(request.requestId)}>
                    <BlockIcon />
                  </IconButton>
                  <IconButton onClick={() => handleReject(request.requestId)}>
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
