import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';

// Styled components with Material-UI's styled API
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: 'linear-gradient(135deg, #42a5f5, #478ed1)', // Gradient background
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)', // Slight zoom effect on hover
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const JobList = () => {
  // State to store job data and loading/error states
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job data from API on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        setJobs(data.jobs);
        setLoading(false);
      } catch (err) {
        setError('Error fetching job data');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Loading and error UI
  if (loading) return <CircularProgress />;
  if (error) return <Box color="error.main">{error}</Box>;

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', color: '#333' }}>
        Explore Job Opportunities
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <StyledCard>
              <CardContent sx={{ flex: 1, padding: '20px' }}>
                <Typography variant="h6" component="h3" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  {job.title}
                </Typography>
                <Typography color="textSecondary" sx={{ color: '#f3f3f3' }}>
                  Company: <span style={{ color: '#fff' }}>{job.company}</span>
                </Typography>
                <Typography color="textSecondary" sx={{ color: '#f3f3f3' }}>
                  Location: <span style={{ color: '#fff' }}>{job.location}</span>
                </Typography>
                <Typography color="textSecondary" sx={{ color: '#f3f3f3' }}>
                  Experience: <span style={{ color: '#fff' }}>{job.experience}</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph sx={{ color: '#f3f3f3' }}>
                  Skills: {job.skills.join(', ')}
                </Typography>
                <Box>
                  {job.skills.map((skill, index) => (
                    <Chip
                      label={skill}
                      key={index}
                      sx={{
                        margin: '4px',
                        backgroundColor: '#fff',
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#1976d2',
                          color: '#fff',
                        },
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobList;
