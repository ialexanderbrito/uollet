import { Route, Routes } from 'react-router-dom';

import { Cards } from 'pages/Cards';
import { CreditCard } from 'pages/CreditCard';
import { Error } from 'pages/Error';
import { Export } from 'pages/Export';
import { Finances } from 'pages/Finances';
import { Goals } from 'pages/Goals';
import { GoalsDetails } from 'pages/GoalsDetails';
import { Import } from 'pages/Import';
import { Investments } from 'pages/Investments';
import { Login } from 'pages/Login';
import { MyProfile } from 'pages/MyProfile';
import { Otp } from 'pages/Otp';
import { Profile } from 'pages/Profile';
import { Recurrency } from 'pages/Recurrency';
import { Register } from 'pages/Register';
import { RegisterGoals } from 'pages/RegisterGoals';
import { ResetPassword } from 'pages/ResetPassword';
import { Resume } from 'pages/Resume';
import { Stock } from 'pages/Stock';
import { Wallet } from 'pages/Wallet';

import { useAuth } from 'contexts/Auth';

export function PrivateRoutes() {
  const { hasOtp, hasMFA } = useAuth();
  const hasOtpStorage = sessionStorage.getItem('@uollet:hasOtp');
  const hasMFAStorage = sessionStorage.getItem('@uollet:hasMFA');

  const url = window.location.href;
  const type = url.split('type=')[2];

  if (type === 'recovery') {
    return (
      <Routes>
        <Route path="/" element={<ResetPassword />} />
      </Routes>
    );
  }

  function handleOtp() {
    if (!hasOtpStorage && !hasOtp) {
      return <Route path="/" element={<Finances />} />;
    }

    if (hasOtp && hasOtpStorage === null) {
      return <Route path="/" element={<Otp isOtp />} />;
    }

    return <Route path="/" element={<Finances />} />;
  }

  function handleMFA() {
    if (!hasMFAStorage && !hasMFA) {
      return <Route path="/" element={<Finances />} />;
    }

    if (hasMFA && hasMFAStorage === null) {
      return <Route path="/" element={<Otp isMFA />} />;
    }

    return <Route path="/" element={<Finances />} />;
  }

  return (
    <Routes>
      {hasMFA ? handleMFA() : handleOtp()}
      {hasOtp ? handleOtp() : handleMFA()}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/goals" element={<RegisterGoals />} />
      <Route path="/edit/:id" element={<Register />} />
      <Route path="/edit/goals/:id" element={<RegisterGoals />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/import" element={<Import />} />
      <Route path="/export" element={<Export />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/goal/:id" element={<GoalsDetails />} />
      <Route path="/profile/:id" element={<MyProfile />} />
      <Route path="/profile/:id/access" element={<MyProfile />} />
      <Route path="/profile/:id/personal" element={<MyProfile />} />
      <Route path="/profile/:id/subscriptions" element={<MyProfile />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/recurrency" element={<Recurrency />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/credit-card" element={<CreditCard />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/stock/:stock" element={<Stock />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
