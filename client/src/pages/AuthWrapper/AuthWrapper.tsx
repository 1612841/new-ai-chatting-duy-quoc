import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from 'store';

type TAuthWrapper = {
  component: ReactNode;
  isLoginPage?: boolean;
};

export const AuthWrapper = ({ component, isLoginPage }: TAuthWrapper) => {
  const userInfo = useUserStore((state) => state.userInfo);

  if (!userInfo && !isLoginPage) return <Navigate to="/" />;
  if (userInfo && isLoginPage) return <Navigate to="/home" />;

  return <>{component}</>;
};
