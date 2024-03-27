import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function DataTablePage() {
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/id`;
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Replace '/your-api-endpoint' with the actual endpoint
    const fetchData = async () => {
        try{
            // const response = await fetch('https://zapbrqobr9.execute-api.ca-central-1.amazonaws.com/dev/id');
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setRecords(data);
        }
        catch (error) {
                console.error('Error fetching records:', error);
            }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
          <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/id/${row._id}`} variant="outlined" color="primary">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="column" spacing={2} marginTop={2}>
        <Button component={Link} to={`/`} variant="outlined">
              Return to Main Page
          </Button>
        </Stack>
    </Container>
  );
}

export default DataTablePage;
