import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Paper, Button, Stack } from '@mui/material';

function RecordDetail() {
  const { id } = useParams(); // Extracting the `id` from the URL.
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/id/${id}`;
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecordById = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch(`https://zapbrqobr9.execute-api.ca-central-1.amazonaws.com/dev/id/${id}`);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Record not found');
        }
        const data = await response.json();
        setRecord(data);
      } catch (err) {
        setError(`Failed to fetch record: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecordById();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!record) return <div>No record found</div>;

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
      <Typography variant="h5">Record Details</Typography>
      <Typography><strong>ID:</strong> {record._id}</Typography>
      <Typography><strong>First Name:</strong> {record.firstName}</Typography>
      <Typography><strong>Last Name:</strong> {record.lastName}</Typography>
      <Typography><strong>Email:</strong> {record.email}</Typography>
      <Typography><strong>Phone Number:</strong> {record.phoneNumber}</Typography>
      
      <Stack direction="column" spacing={2} marginTop={2}>
        <Button component={Link} to={`/id/${id}/update`} variant="outlined" color="primary">
            Update Record
        </Button>

        <Button component={Link} to={`/id/`} variant="outlined">
            Return to Details
        </Button>
      </Stack>
    </Paper>
  );
}

export default RecordDetail;
