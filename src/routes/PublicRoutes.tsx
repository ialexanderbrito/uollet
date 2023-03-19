import { Route, Routes } from 'react-router-dom';

import { Error } from 'pages/Error';
import { Login } from 'pages/Login';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
