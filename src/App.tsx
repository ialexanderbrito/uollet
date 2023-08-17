import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { CheckConnection } from 'components/CheckConnection';
import { KBar } from 'components/KBarComponent';

import { AuthProvider } from 'contexts/Auth';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

import 'react-tooltip/dist/react-tooltip.css';
import 'react-spring-bottom-sheet/dist/style.css';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <CheckConnection>
              <KBar>
                <MainRoutes />
              </KBar>
            </CheckConnection>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
