import { Route, Routes } from 'react-router-dom';

import { Error } from 'pages/Error';
import { Finances } from 'pages/Finances';
import { Import } from 'pages/Import';
import { Register } from 'pages/Register';
import { Resume } from 'pages/Resume';

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Finances />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/import" element={<Import />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
