import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorImg from '../../assets/images/backgrounds/errorimg.svg';

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img src={ErrorImg} alt="404" />
      <Typography align="center" variant="h1" mb={4}>
        عذراً!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        الصفحة التي تبحث عنها غير موجودة.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/"
        disableElevation
      >
        العودة للصفحة الرئيسية
      </Button>
    </Container>
  </Box>
);

export default Error;
