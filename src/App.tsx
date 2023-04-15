import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { CheckConnection } from 'components/CheckConnection';

import { AuthProvider } from 'contexts/Auth';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <CheckConnection>
              <MainRoutes />
            </CheckConnection>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
