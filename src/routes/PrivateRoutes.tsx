import { Route, Routes } from 'react-router-dom';

import { Error } from 'pages/Error';
import { Export } from 'pages/Export';
import { Finances } from 'pages/Finances';
import { Import } from 'pages/Import';
import { Otp } from 'pages/Otp';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
import { Resume } from 'pages/Resume';

import { useAuth } from 'contexts/Auth';

export function PrivateRoutes() {
  const { hasOtp } = useAuth();
  const hasOtpStorage = localStorage.getItem('@finance:hasOtp');

  function handleOtp() {
    if (!hasOtpStorage && !hasOtp) {
      return <Route path="/" element={<Finances />} />;
    }

    if (hasOtp && hasOtpStorage === null) {
      return <Route path="/" element={<Otp />} />;
    }

    return <Route path="/" element={<Finances />} />;
  }

  return (
    <Routes>
      {handleOtp()}
      <Route path="/otp" element={<Otp />} />
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
