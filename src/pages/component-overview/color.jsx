import React, { useState } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Search } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

function DataTable({ data, searchQuery }) {
  return (
    <Grid item xs={12}>
      <MainCard title="Search Results">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Job Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((item) => {
                const searchTerm = searchQuery.toLowerCase();
                return (
                  item.requestId.toLowerCase().includes(searchTerm) ||
                  item.firstName.toLowerCase().includes(searchTerm) ||
                  item.lastName.toLowerCase().includes(searchTerm) ||
                  item.dob.toLowerCase().includes(searchTerm) ||
                  item.jobTitle.toLowerCase().includes(searchTerm)
                );
              })
              .map((item) => (
                <TableRow key={item.requestId}>
                  <TableCell>{item.requestId}</TableCell>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.dob}</TableCell>
                  <TableCell>{item.jobTitle}</TableCell>
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
  ]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by Request ID, First Name, Last Name, DOB, or Job Title"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <DataTable data={data} searchQuery={searchQuery} />
      </Grid>
    </ComponentSkeleton>
  );
}
