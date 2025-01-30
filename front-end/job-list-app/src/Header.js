import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledAppBar = (props) => (
  <AppBar position="static" sx={{ backgroundColor: '#333' }} {...props} />
);

const Header = () => {
  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 20px' }}>
        {/* Left section with title */}
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Job Finder
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#f1f1f1',
              fontWeight: 300,
              fontSize: '1rem',
            }}
          >
            Discover your next opportunity
          </Typography>
        </Box>

        {/* Right section with buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            sx={{
              color: '#fff',
              fontWeight: 600,
              marginLeft: 2,
              '&:hover': {
                backgroundColor: '#1976d2',
                color: '#fff',
              },
            }}
          >
            <Link
              to="/jobs"
              style={{
                textDecoration: 'none',
                color: 'inherit', // inherit button color
              }}
            >
              View Jobs
            </Link>
          </Button>
          <Button
            sx={{
              color: '#fff',
              fontWeight: 600,
              marginLeft: 2,
              '&:hover': {
                backgroundColor: '#1976d2',
                color: '#fff',
              },
            }}
          >
            <Link
              to="/stats"
              style={{
                textDecoration: 'none',
                color: 'inherit', // inherit button color
              }}
            >
              Stats
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
