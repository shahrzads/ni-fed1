import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function UpdateForm() {
  const { id } = useParams(); // Extracting the `id` from the URL.
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/id/${id}`;
  const[openSnackbar, setOpenSnackbar] = useState(false); //State to control Snackbar visibility
  const navigate = useNavigate(); //Hook to programmatically navigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchRecordById = async () => {
      try {
        // const response = await fetch(`https://zapbrqobr9.execute-api.ca-central-1.amazonaws.com/dev/id/${id}`);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Record not found');
        }
        const data = await response.json();
        // setFormData(data);
        console.log('Fetched data:', data); // Log the fetched data for debugging.
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
        });
      } catch (err) {
        console.error('Error fetching record:', err);
      }
    };

    fetchRecordById();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

//   const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // const response = await fetch(`https://zapbrqobr9.execute-api.ca-central-1.amazonaws.com/dev/id/${id}`, {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Failed to update record');
        }
        console.log('Record updated successfully');
        setOpenSnackbar(true); // Open the snackbar to show success message
        // Optionally, you can redirect the user to another page or perform other actions upon successful update
        setTimeout(() => {
            navigate(`/id/${id}`); // Navigate to the form page again after showing the success message
          }, 3000); // Adjust timing based on preference
        // history.push(`/id/${id}`);
      } catch (error) {
        console.error('Error updating record:', error);
        // Optionally, you can show an error message to the user or handle the error in any other way
      }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Update Record
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Stack direction="column" spacing={2} marginTop={2}>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
            Update
            </Button>

            <Button component={Link} to={`/id/${id}`} variant="outlined">
            Return to Details
            </Button>
        </Stack>
      </form>
      <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Data saved successfully!"
        />
    </Container>
  );
}

export default UpdateForm;
