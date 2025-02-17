import { useHomeStore } from 'store';
import { User } from './User';
import { IoChevronBack } from 'react-icons/io5';
import { ChattingHistory } from './ChattingHistory';
import { useEffect, useState } from 'react';

const Chatting = () => {
  const [selectedUser, setSelectedUser, userList] = useHomeStore((state) => [
    state.selectedUser,
    state.setSelectedUser,
    state.userList,
  ]);
  const [active, setActive] = useState(true);

  const removeSelectedUser = () => setSelectedUser();

  useEffect(() => {
    const activeSelectedUser = (userList || []).some(
      (f) => f.id === selectedUser?.id
    );
    setActive(activeSelectedUser);
  }, [userList, selectedUser]);

  if (!selectedUser) return null;
  return (
    <div
      key={selectedUser.id}
      className="w-full h-full md:w-3/5 absolute top-0 left-0 md:static bg-white rounded-3xl slideFromLeft md:animate-fade-in md:z-10"
    >
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <User {...{ ...selectedUser, online: active }} />
        </div>
        <button
          className="w-8 h-8 px-2 cursor-pointer rounded-full hover:bg-gray-100 duration-300"
          onClick={removeSelectedUser}
        >
          <IoChevronBack />
        </button>
      </div>
      <hr />

      <ChattingHistory />
    </div>
  );
};

export default Chatting;
