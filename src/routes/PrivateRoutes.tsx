import { Route, Routes } from 'react-router-dom';

import { Cards } from 'pages/Cards';
import { CreditCard } from 'pages/CreditCard';
import { Error } from 'pages/Error';
import { Export } from 'pages/Export';
import { Finances } from 'pages/Finances';
import { Import } from 'pages/Import';
import { Investments } from 'pages/Investments';
import { Login } from 'pages/Login';
import { MyProfile } from 'pages/MyProfile';
import { Otp } from 'pages/Otp';
import { Profile } from 'pages/Profile';
import { Register } from 'pages/Register';
import { ResetPassword } from 'pages/ResetPassword';
import { Resume } from 'pages/Resume';
import { Wallet } from 'pages/Wallet';

import { useAuth } from 'contexts/Auth';

export function PrivateRoutes() {
  const { hasOtp, signed, hasMFA } = useAuth();
  const hasOtpStorage = sessionStorage.getItem('@uollet:hasOtp');
  const hasMFAStorage = sessionStorage.getItem('@uollet:hasMFA');

  if (!signed) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }

  function handleOtp() {
    if (!hasOtpStorage && !hasOtp) {
      return <Route path="/" element={<Finances />} />;
    }

    if (!hasMFAStorage && !hasMFA) {
      return <Route path="/" element={<Finances />} />;
    }

    if (hasMFA && hasMFAStorage === null) {
      return <Route path="/" element={<Otp isMFA />} />;
    }

    if (hasOtp && hasOtpStorage === null) {
      return <Route path="/" element={<Otp isOtp />} />;
    }

    return <Route path="/" element={<Finances />} />;
  }

  return (
    <Routes>
      {handleOtp()}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:id" element={<Register />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/import" element={<Import />} />
      <Route path="/export" element={<Export />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<MyProfile />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/credit-card" element={<CreditCard />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
