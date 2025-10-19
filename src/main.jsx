import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Spinner from './views/spinner/Spinner.jsx';
import { CustomizerContextProvider } from './context/CustomizerContext.jsx';
import ErrorBoundary from './components/shared/ErrorBoundary.jsx';

async function bootstrap() {
  // استورد ملفات التطبيق
  await import('./utils/i18n.jsx');

  ReactDOM.createRoot(document.getElementById('root')).render(
    <CustomizerContextProvider>
      <ErrorBoundary>
        <React.Suspense fallback={<Spinner />}>
          <App />
        </React.Suspense>
      </ErrorBoundary>
    </CustomizerContextProvider>,
  );
}

bootstrap();
