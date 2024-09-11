import React from 'react';

// Import Material-UI components
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton
} from '@mui/material';

// Import Material-UI icons
import CheckCircleIcon from '@mui/icons-material/CheckCircleTwoTone';
import BlockIcon from '@mui/icons-material/BlockOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
// project import
import MainCard from 'components/MainCard';

// sample data
const idCardRequests = [
  {
    requestId: 'REQ-001',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    jobTitle: 'Software Engineer'
  },
  {
    requestId: 'REQ-002',
    firstName: 'Jane',
    lastName: 'Doe',
    dob: '1995-06-01',
    jobTitle: 'Marketing Manager'
  },
  {
    requestId: 'REQ-003',
    firstName: 'Bob',
    lastName: 'Smith',
    dob: '1980-03-01',
    jobTitle: 'Sales Representative'
  }
];

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRequestId, setSelectedRequestId] = React.useState('');

  const [action, setAction] = React.useState('');
  const [comments, setComments] = React.useState('');

  const handleSubmitAction = () => {
    // Handle the selected action and comments here
    console.log(action, comments);
    setOpenDialog(false);
  };

  const handleApprove = (requestId) => {
    setSelectedRequestId(requestId);
    setOpenDialog(true);
  };

  const handleBlock = (requestId) => {
    console.log(`Block request ${requestId}`);
  };

  const handleReject = (requestId) => {
    console.log(`Reject request ${requestId}`);
  };

  const handleSubmit = () => {
    console.log(`Approve request ${selectedRequestId} with comments: ${comments}`);
    setOpenDialog(false);
  };

  return (
    <MainCard title="ID Card Issuance Approval">
      {/* <Typography variant="body2">
       
      </Typography> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {idCardRequests.map((request) => (
              <TableRow key={request.requestId}>
                <TableCell>{request.requestId}</TableCell>
                <TableCell>{request.firstName}</TableCell>
                <TableCell>{request.lastName}</TableCell>
                <TableCell>{request.dob}</TableCell>
                <TableCell>{request.jobTitle}</TableCell>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Request Action</DialogTitle>
        <DialogContent>
          <DialogContentText>Please select an action and enter your comments for request {selectedRequestId}</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="action-label">Action</InputLabel>
            <Select labelId="action-label" id="action" value={action} label="Action" onChange={(e) => setAction(e.target.value)}>
              <MenuItem value="approve">Approve</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
              <MenuItem value="block">Block</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="comments"
            label="Comments"
            type="text"
            fullWidth
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleSubmitAction()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}
