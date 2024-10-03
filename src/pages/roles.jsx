import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from '@mui/material';

const rolesData = ['Admin', 'User', 'Manager'];
const permissionsData = ['Read', 'Write', 'Delete'];

const AssignUserToRole = () => {
  const [users, setUsers] = useState([
    {
      id: 2,
      nom: 'mht',
      prenom: 'Hassan',
      center: 'Farcha',
      NNI: '4747747',
      role: 'Admin',
    },
    {
      id: 2,
      nom: 'Jane Smith',
      prenom: 'Hassan',
      center: 'Farcha',
      NNI: '4747747',
      role: 'User',
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handlePermissionChange = (permission) => {
    setPermissions((prev) => ({ ...prev, [permission]: !prev[permission] }));
  };

  const handleAddRole = () => {
    // Process adding role with permissions
    console.log('New Role:', newRole);
    console.log('Permissions:', permissions);
    handleCloseModal();
  };

  return (
    <Container>
      <Typography mt={6} variant='h4' gutterBottom>
        Assign User to Role
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prenom</TableCell> <TableCell>Prenom</TableCell>
            <TableCell>NNI</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>center</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nom}</TableCell>
              <TableCell>{user.prenom}</TableCell>
              <TableCell>{user.NNI}</TableCell>
              <TableCell>{user.center}</TableCell>

              <TableCell xs={3} md={3}>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  {rolesData.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                {/* <Button variant='contained' color='secondary'>
                  Save
                </Button> */}
                {user.center}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant='contained' color='primary' onClick={handleOpenModal}>
        Add Role
      </Button>

      {/* Modal for Adding Role */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'white',
            margin: '10% auto',
            width: 400,
          }}
        >
          <Typography variant='h6'>Add Role</Typography>
          <TextField
            fullWidth
            label='Role Name'
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography sx={{ mt: 2 }}>Permissions</Typography>
          {permissionsData.map((perm) => (
            <FormControlLabel
              key={perm}
              control={
                <Checkbox
                  checked={permissions[perm.toLowerCase()]}
                  onChange={() => handlePermissionChange(perm.toLowerCase())}
                />
              }
              label={perm}
            />
          ))}
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAddRole}
          >
            Add Role
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AssignUserToRole;
