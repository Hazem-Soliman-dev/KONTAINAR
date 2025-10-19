import RTL from './layouts/shared/customizer/RTL.jsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { ThemeSettings } from './theme/Theme.jsx';
import router from './routes/MainRouter.jsx';
import { CustomizerContext } from './context/CustomizerContext.jsx';
import { useContext } from 'react';

function App() {
  const theme = ThemeSettings();
  const { activeDir } = useContext(CustomizerContext);

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={activeDir}>
        <CssBaseline />
        <RouterProvider router={router} />
      </RTL>
    </ThemeProvider>
  );
}

export default App;
