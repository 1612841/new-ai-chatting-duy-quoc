import { lazy } from 'react';
import { UserList } from './components';
import { useHomeStore } from 'store';

const Chatting = lazy(() => import('./components'));

export const Home = () => {
  const selectedUser = useHomeStore((state) => state.selectedUser);

  return (
    <div className="h-screen px-32 py-16 bg-[#e7ebf7]">
      <div
        className={`h-full px-12 py-10 flex bg-[#f4f8fb] rounded-3xl shadow-lg gap-4 transition-all ease-in-out duration-300 ${
          !selectedUser ? 'w-1/2' : 'w-full'
        }`}
      >
        <UserList />
        <Chatting />
      </div>
    </div>
  );
};
