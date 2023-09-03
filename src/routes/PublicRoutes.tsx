import { Route, Routes } from 'react-router-dom';

import { Error } from 'pages/Error';
import { LandingPage } from 'pages/LandingPage';
import { ResetPassword } from 'pages/ResetPassword';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
