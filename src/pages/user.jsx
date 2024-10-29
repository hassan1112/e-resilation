import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Delete, Edit, Block } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { red } from '@mui/material/colors';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'mht',
      prenom: 'Hassan',
      NNI: '28373646',
      fonction: 'CC',

      center: 'goudji',
      email: 'john@example.com',
      status: 'Active',
      userType: 'operator',
    },
    {
      id: 2,
      name: 'Jane Doe',
      prenom: 'Adam',
      NNI: '0000334232',
      fonction: 'CC',

      email: 'jane@example.com',
      center: 'farcha',
      status: 'Disabled',
      userType: 'Admin',
    },
  ]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDisableModal, setOpenDisableModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    reset();
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    reset();
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  const handleOpenDisableModal = (user) => {
    setSelectedUser(user);
    setOpenDisableModal(true);
  };
  const handleCloseDisableModal = () => setOpenDisableModal(false);

  const addUser = (data) => {
    setUsers([...users, { id: users.length + 1, ...data, status: 'Active' }]);
    handleCloseAddModal();
  };

  const editUser = (data) => {
    setUsers(
      users.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u))
    );
    handleCloseEditModal();
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const disableUser = () => {
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id ? { ...u, status: 'Disabled' } : u
      )
    );
    handleCloseDisableModal();
  };

  return (
    <Box p={2} mt={3}>
      <Typography variant='h4' gutterBottom>
        Gestion des utilisateurs
      </Typography>

      {/* Filters */}
      <Box mb={2} display='flex' justifyContent='space-between'>
        <TextField label='Rechercher un utilisateur' variant='outlined' />
        <Button
          variant='contained'
          color='primary'
          onClick={handleOpenAddModal}
        >
          Ajouter un utilisateur
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prenom</TableCell>
              <TableCell>NNI</TableCell>

              <TableCell>fonction</TableCell>
              <TableCell>Center</TableCell>

              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.prenom}</TableCell>
                <TableCell>{user.NNI}</TableCell>

                <TableCell>{user.fonction}</TableCell>
                <TableCell>{user.center}</TableCell>

                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    onClick={() => handleOpenEditModal(user)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color='success'
                    onClick={() => handleOpenDisableModal(user)}
                  >
                    <Block />
                  </IconButton>
                  <IconButton
                    sx={{ color: red[500] }}
                    onClick={() => deleteUser(user.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Modal */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant='h6'>Ajouter un utilisateur</Typography>
          <form onSubmit={handleSubmit(addUser)}>
            <TextField
              label='Name'
              {...register('name')}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Prenom'
              {...register('Prenom')}
              fullWidth
              margin='normal'
            />

            <TextField
              label='NNI'
              {...register('NNI')}
              fullWidth
              margin='normal'
            />

            <TextField
              label='Fonction'
              {...register('fonction')}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Email'
              {...register('email')}
              fullWidth
              margin='normal'
            />

            <FormControl fullWidth margin='normal'>
              <InputLabel id='user-type-label'>User Type</InputLabel>
              <Select
                labelId='user-type-label'
                label='type utilisateur'
                {...register('userType')}
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='cc'>CC</MenuItem>
                <MenuItem value='ing'>ING</MenuItem>
                <MenuItem value='operator'>Operator</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label='center'
              {...register('center')}
              fullWidth
              margin='normal'
            />
            <Button type='submit' variant='contained' color='primary'>
              Add
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Edit User Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant='h6'>Edit User</Typography>
          <form onSubmit={handleSubmit(editUser)}>
            <TextField
              label='Name'
              defaultValue={selectedUser?.name}
              {...register('name')}
              fullWidth
              margin='normal'
            />
            <TextField
              label='prenom'
              defaultValue={selectedUser?.prenom}
              {...register('prenom')}
              fullWidth
              margin='normal'
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel id='user-type-label'>User Type</InputLabel>
              <Select
                labelId='user-type-label'
                label='User Type'
                {...register('userType')}
                disabled
              ></Select>
            </FormControl>

            <TextField
              label='NNI'
              {...register('NNI')}
              fullWidth
              margin='normal'
            />

            <TextField
              label='Fonction'
              {...register('fonction')}
              fullWidth
              margin='normal'
            />

            <TextField
              label='Email'
              defaultValue={selectedUser?.email}
              {...register('email')}
              fullWidth
              margin='normal'
            />

            <TextField
              label='center'
              defaultValue={selectedUser?.center}
              {...register('center')}
              fullWidth
              margin='normal'
            />
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Disable User Dialog */}
      <Dialog open={openDisableModal} onClose={handleCloseDisableModal}>
        <DialogTitle>Disable User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to disable this user?</Typography>
          <TextField label='Comments' fullWidth margin='normal' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisableModal} color='primary'>
            Cancel
          </Button>
          <Button onClick={disableUser} color='secondary'>
            Disable
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default UserManagement;
