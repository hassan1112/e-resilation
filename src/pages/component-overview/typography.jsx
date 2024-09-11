import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ComponentSkeleton from './ComponentSkeleton';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import { Edit, Settings, Delete, Block } from '@mui/icons-material';

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'left',
  justifyContent: 'left'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #fff',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3)
}));

function ComponentTypography() {
  const [users, setUsers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPermissionsModal, setOpenPermissionsModal] = useState(false);
  const [openInactivateModal, setOpenInactivateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // fetch users data from API
    const usersData = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Operator', mobile: '1234567890', position: 'Operator' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Investigator', mobile: '9876543210', position: 'Investigator' },
      { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Validator', mobile: '5555555555', position: 'Validator' },
      { id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Admin', mobile: '1111111111', position: 'Admin' }
    ];
    setUsers(usersData);
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleSaveEditUser = () => {
    // save edited user data to API
    setOpenEditModal(false);
  };

  const handlePermissionsUser = (user) => {
    setSelectedUser(user);
    setOpenPermissionsModal(true);
  };

  const handleSavePermissionsUser = () => {
    // save permissions user data to API
    setOpenPermissionsModal(false);
  };

  const handleInactivateUser = (user) => {
    setSelectedUser(user);
    setOpenInactivateModal(true);
  };

  const handleInactivateUserConfirm = () => {
    // inactivate user data to API
    setOpenInactivateModal(false);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleDeleteUserConfirm = () => {
    // delete user data to API
    setOpenDeleteModal(false);
  };

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <TableContainer>
              <StyledTable aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Mobile</TableCell>
                    <TableCell align="right">Position</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.role}</TableCell>
                      <TableCell align="right">{user.mobile}</TableCell>
                      <TableCell align="right">{user.position}</TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleEditUser(user)}>
                          <Edit color="primary" />
                        </Button>
                        {/* <Button onClick={() => handlePermissionsUser(user)}>
                          <Settings color="primary" />
                        </Button>
                        <Button onClick={() => handleInactivateUser(user)}>
                          <Block color="primary" />
                        </Button>
                        <Button onClick={() => handleDeleteUser(user)}>
                          <Delete color="primary" />
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-user-modal"
        aria-describedby="edit-user-form"
      >
        <StyledPaper>
          <h2 id="edit-user-modal">Edit User</h2>
          <form id="edit-user-form">
            <TextField
              label="Name"
              value={selectedUser?.name || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={selectedUser?.email || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={selectedUser?.role || ''} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}>
                <MenuItem value="Operator">Operator</MenuItem>
                <MenuItem value="Investigator">Investigator</MenuItem>
                <MenuItem value="Validator">Validator</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
              <FormHelperText>Select the role of the user</FormHelperText>
            </FormControl>
            <TextField
              label="Mobile"
              value={selectedUser?.mobile || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })}
              fullWidth
            />
            <TextField
              label="Position"
              value={selectedUser?.position || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, position: e.target.value })}
              fullWidth
            />
            <Button onClick={handleSaveEditUser}>Save</Button>
          </form>
        </StyledPaper>
      </StyledModal>
    </ComponentSkeleton>
  );
}

export default ComponentTypography;
