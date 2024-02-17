import { BrowserRouter } from 'react-router-dom';

import { ConfigCatProvider, PollingMode } from 'configcat-react';
import { Crisp } from 'crisp-sdk-web';
import { MainRoutes } from 'routes';

import { CheckConnection } from 'components/CheckConnection';

import { AuthProvider } from 'contexts/Auth';
import { ThemeProvider } from 'contexts/Theme';
import { ToastProvider } from 'contexts/Toast';

import 'react-tooltip/dist/react-tooltip.css';
import 'swiper/css';

export function App() {
  Crisp.setHideOnMobile(true);
  Crisp.configure(import.meta.env.VITE_CRISP_ID);

  return (
    <ConfigCatProvider
      sdkKey={import.meta.env.VITE_CONFIGCAT_SDK}
      pollingMode={PollingMode.AutoPoll}
      options={{
        pollIntervalSeconds: 5,
      }}
    >
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
    </ConfigCatProvider>
  );
}
