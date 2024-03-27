import React, {useState, useEffect} from "react";
import { TextField, Button, Container, Typography, Stack, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Form(){
    const[formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    })

    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/save`;
    const [errors, setErrors] = useState({});
    const[openSnackbar, setOpenSnackbar] = useState(false); //State to control Snackbar visibility
    const navigate = useNavigate(); //Hook to programmatically navigate

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.firstName = formData.firstName ? "" : "First name is required.";
        tempErrors.lastName = formData.lastName ? "" : "Last name is required.";
        // tempErrors.email = (formData.email && /\S+@\S+\.\S+/.test(formData.email)) ? "" : "Email is invalid.";
        tempErrors.email = (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? "" : "Email is invalid.";
        tempErrors.phoneNumber = (formData.phoneNumber && /^[0-9]{10}$/.test(formData.phoneNumber)) ? "" : "Phone number is invalid.";

        setErrors({...tempErrors});
        return Object.values(tempErrors).every(x => x === "");
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      // API call to save form data
    const saveFormData = async (data) => {
      try {
          // const response = await fetch('https://zapbrqobr9.execute-api.ca-central-1.amazonaws.com/dev/save', {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          console.log('Data saved successfully:', result);
          setOpenSnackbar(true); // Open the snackbar to show success message
          // Reset form (if desired) or navigate
          setFormData({firstName: '', lastName: '', email: '', phoneNumber: ''}); // Reset form
          setTimeout(() => {
            navigate("/"); // Navigate to the form page again after showing the success message
          }, 3000); // Adjust timing based on preference
      } catch (error) {
          console.error('Error saving data:', error);
      }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          // // proceed with form submission
          // console.log('Form valid, submit data:', formData);
          await saveFormData(formData);
        } else {
          console.log('Form invalid:', errors);
        }
      };

    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };

      return (
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom>
            Contact Form
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder="First Name"
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            {/* {errors.firstName && <div>{errors.firstName}</div>} */}
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
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
              error={!!errors.email}
              helperText={errors.email}
              inputProps={{"data-testid": "email"}}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            {/* Buttons with Stack for vertical layout */}
            <Stack direction="column" spacing={2} marginTop={2}>
              <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }} data-testid="submit-button">
                Submit
              </Button>
              
              <Button variant="contained" color="secondary" component={Link} to="/id" data-testid="data-table-button">
                    View Data Table
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

export default Form