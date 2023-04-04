import { Route, Routes } from 'react-router-dom';

import { Error } from 'pages/Error';
import { Export } from 'pages/Export';
import { Finances } from 'pages/Finances';
import { Import } from 'pages/Import';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
import { Resume } from 'pages/Resume';

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Finances />} />
      <Route path="/category/:id" element={<Finances />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:id" element={<Register />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/import" element={<Import />} />
      <Route path="/export" element={<Export />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
