import { lazy } from 'react';
import { UserList } from './components';
import { useHomeStore } from 'store';

const Chatting = lazy(() => import('./components'));

export const Home = () => {
  const selectedUser = useHomeStore((state) => state.selectedUser);

  return (
    <div className="h-screen sm:px-16 sm:py-8 bg-[#e7ebf7]">
      <div
        className={`w-full h-full p-4 md:p-4 lg:p-10 flex flex-col md:flex-row bg-[#f4f8fb] rounded-3xl shadow-lg gap-3 md:gap-4 transition-all ease-in-out duration-300 relative ${
          !selectedUser ? 'md:w-1/2' : ''
        }`}
      >
        <UserList />
        <Chatting />
      </div>
    </div>
  );
};
