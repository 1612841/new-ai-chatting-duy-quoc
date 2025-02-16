import { useHomeStore } from 'store';
import { User } from './User';
import { IoChevronBack } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { ChattingHistory } from './ChattingHistory';

const Chatting = () => {
  const [selectedUser, setSelectedUser] = useHomeStore((state) => [
    state.selectedUser,
    state.setSelectedUser,
  ]);

  const removeSelectedUser = () => setSelectedUser();

  if (!selectedUser) return null;

  return (
    <div className="w-3/5 bg-white rounded-3xl animate-fade-in">
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <User {...selectedUser} />
        </div>
        <button
          className="w-8 h-8 px-2 cursor-pointer rounded-full hover:bg-gray-100 duration-300"
          onClick={removeSelectedUser}
        >
          <IoChevronBack />
        </button>
      </div>
      <hr />
      <div className="h-[calc(100%-4.5rem)] p-4 flex flex-col gap-2">
        <div className="px-5 py-3 flex-1 bg-[#f4f8fb] rounded-2xl overflow-y-scroll">
          <ChattingHistory />
        </div>
        <div className="h-16 flex justify-center items-center gap-4 rounded-lg">
          <input
            className="px-4 flex-1 leading-12 text-base bg-[#eceef1] rounded-3xl"
            placeholder="Aa"
          />
          <button className="p-2 cursor-pointer hover:opacity-50">
            <IoIosSend size={24} color="blue" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
