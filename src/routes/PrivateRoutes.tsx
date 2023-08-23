import { Route, Routes } from 'react-router-dom';

import { Cards } from 'pages/Cards';
import { CreditCard } from 'pages/CreditCard';
import { Error } from 'pages/Error';
import { Export } from 'pages/Export';
import { Finances } from 'pages/Finances';
import { Import } from 'pages/Import';
import { MyProfile } from 'pages/MyProfile';
import { Otp } from 'pages/Otp';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
import { ResetPassword } from 'pages/ResetPassword';
import { Resume } from 'pages/Resume';
import { Wallet } from 'pages/Wallet';

import { useAuth } from 'contexts/Auth';

export function PrivateRoutes() {
  const { hasOtp } = useAuth();
  const hasOtpStorage = sessionStorage.getItem('@finance:hasOtp');

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
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:id" element={<Register />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/import" element={<Import />} />
      <Route path="/export" element={<Export />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<MyProfile />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/credit-card" element={<CreditCard />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
