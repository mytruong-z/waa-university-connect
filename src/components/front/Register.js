import React, {useEffect} from "react";
import {useState} from "react";
import {CssBaseline, Box, Typography, TextField, Button, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {getStudent, registerStudent, testapi} from "../../services/apiService";

export default function Register(){
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        major: '',
        academicAchievements: [],
        interests: [],
        extracurricularActivities: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddItem = (type) => {
        let newItem;
        switch (type) {
            case 'achievement':
                newItem = formData.newAchievement.trim();
                if (newItem !== '') {
                    setFormData({
                        ...formData,
                        academicAchievements: [...formData.academicAchievements, newItem],
                        newAchievement: '', // Clear input field after adding
                    });
                }
                break;
            case 'interest':
                newItem = formData.newInterest.trim();
                if (newItem !== '') {
                    setFormData({
                        ...formData,
                        interests: [...formData.interests, newItem],
                        newInterest: '', // Clear input field after adding
                    });
                }
                break;
            case 'activity':
                newItem = formData.newActivity.trim();
                if (newItem !== '') {
                    setFormData({
                        ...formData,
                        extracurricularActivities: [...formData.extracurricularActivities, newItem],
                        newActivity: '', // Clear input field after adding
                    });
                }
                break;
            default:
                break;
        }
    };

    const handleClearList = (type) => {
        switch (type) {
            case 'achievement':
                setFormData({
                    ...formData,
                    academicAchievements: [],
                });
                break;
            case 'interest':
                setFormData({
                    ...formData,
                    interests: [],
                });
                break;
            case 'activity':
                setFormData({
                    ...formData,
                    extracurricularActivities: [],
                });
                break;
            default:
                break;
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        registerStudent(formData)
            .then((response) => {
                const data=response.data.data;
                alert('registered successfully!! ' +
                    'Student Id : '+ data.studentId);
            })
            .catch(error => {
                console.error('There was an error registering the student!', error);
            });
    };

    useEffect(() => {

    }, []);

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel id="major-label">Major</InputLabel>
                        <Select
                            labelId="major-label"
                            id="major"
                            value={formData.major}
                            onChange={handleChange}
                            label="Major"
                            name="major"
                            required
                        >
                            <MenuItem value="Compro">Compro</MenuItem>
                            <MenuItem value="MBA">MBA</MenuItem>
                        </Select>
                    </FormControl>

                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                            Academic Achievements
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="newAchievement"
                            label="Add Achievement"
                            name="newAchievement"
                            value={formData.newAchievement}
                            onChange={handleChange}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleAddItem('achievement')}>
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClearList('achievement')}
                            style={{ marginLeft: '10px' }}>
                            Clear
                        </Button>
                        {formData.academicAchievements.map((achievement, index) => (
                            <Typography key={index}>{achievement}</Typography>
                        ))}
                    </Box>

                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                            Interests
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="newInterest"
                            label="Add Interest"
                            name="newInterest"
                            value={formData.newInterest}
                            onChange={handleChange}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleAddItem('interest')}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClearList('interest')}
                            style={{ marginLeft: '10px' }}
                        >
                            Clear
                        </Button>
                        {formData.interests.map((interest, index) => (
                            <Typography key={index}>{interest}</Typography>
                        ))}
                    </Box>

                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                            Extracurricular Activities
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="newActivity"
                            label="Add Activity"
                            name="newActivity"
                            value={formData.newActivity}
                            onChange={handleChange}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleAddItem('activity')}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleClearList('activity')}
                            style={{ marginLeft: '10px' }}
                        >
                            Clear
                        </Button>
                        {formData.extracurricularActivities.map((activity, index) => (
                            <Typography key={index}>{activity}</Typography>
                        ))}
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}