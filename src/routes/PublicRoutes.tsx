import { Route, Routes } from 'react-router-dom';

import { Error } from 'pages/Error';
import { Login } from 'pages/Login';
import { ResetPassword } from 'pages/ResetPassword';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
