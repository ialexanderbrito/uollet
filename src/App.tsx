import { BrowserRouter } from 'react-router-dom';

import { MainRoutes } from 'routes';

import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

export function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ToastProvider>
  );
}
