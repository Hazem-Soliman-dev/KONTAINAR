import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MaintenanceImg from '../../assets/images/backgrounds/maintenance.svg';

const Maintenance = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img src={MaintenanceImg} alt="404" style={{ width: '100%', maxWidth: '500px' }} />
      <Typography align="center" variant="h1" mb={4} mt={3}>
        وضع الصيانة!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        الموقع قيد الصيانة. يرجى المحاولة لاحقاً!
      </Typography>
      <Button color="primary" variant="contained" component={Link} to="/" disableElevation>
        العودة للصفحة الرئيسية
      </Button>
    </Container>
  </Box>
);

export default Maintenance;
