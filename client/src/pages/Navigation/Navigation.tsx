import { Navigate } from 'react-router-dom';
import { useUserStore } from 'store';

export const Navigation = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  return <Navigate to={!userInfo ? '/' : '/home'} />;
};
