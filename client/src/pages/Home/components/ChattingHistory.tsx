import { getChatHistory } from 'apis';
import { DefaultUser } from 'assets';
import { use, useWebsocket } from 'hooks';
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHomeStore, useUserStore } from 'store';
import { IoIosSend } from 'react-icons/io';

export const ChattingHistory = () => {
  const { id: userId = '' } = useUserStore((state) => state.userInfo) || {};
  const [selectedUser, chatHistory, setChatHistory] = useHomeStore((state) => [
    state.selectedUser,
    state.chatHistory,
    state.setChatHistory,
  ]);
  const { id: selectedUserId = '', username: selectedUserName } =
    selectedUser || {};

  const [inputMessage, setInputMessage] = useState<string>();
  const { sendMessage } = useWebsocket();

  /*Apis */
  const data = use(
    () => getChatHistory({ userId, receiverId: selectedUserId }),
    !!userId && !!selectedUserId
  );

  useEffect(() => {
    if (data) {
      setChatHistory(data);
    }
  }, [data]);

  const renderChatHistory = useMemo(
    () =>
      chatHistory.map(
        (
          { id, sender: { id: senderId }, receiver: { id: recId }, message },
          index
        ) => {
          const justify = userId === senderId ? 'justify-end' : 'justify-start';

          const senderAvatar =
            chatHistory?.[index + 1] &&
            chatHistory[index + 1]?.sender.id !== senderId &&
            senderId === selectedUserId ? (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={DefaultUser}
                alt="logo"
              />
            ) : (
              <div className="w-8" />
            );

          const customMessage = (
            <p
              className={`max-w-2/3 px-3 py-2 rounded-2xl ${
                userId === senderId ? 'bg-sky-200' : 'bg-[#f0f0f0]'
              }`}
            >
              {message}
            </p>
          );

          const messageSpace =
            chatHistory?.[index + 1] &&
            (chatHistory[index + 1].sender.id !== senderId ||
              chatHistory[index + 1]?.receiver.id !== recId)
              ? 'mb-4'
              : 'mb-2';

          return (
            <div key={[id, senderId, recId].join('_')} className={messageSpace}>
              <div className={`flex ${justify} items-center gap-2`}>
                {senderAvatar}
                {customMessage}
              </div>
            </div>
          );
        }
      ),
    [chatHistory, selectedUserId, userId]
  );

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setInputMessage(e.target.value);
  const handleSendMessage = () => {
    if (inputMessage) {
      sendMessage?.(selectedUserId, selectedUserName, inputMessage);
      setInputMessage('');
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && handleSendMessage();
  };

  return (
    <div className="h-[calc(100%-4.5rem)] p-4 flex flex-col gap-2">
      <div className="px-5 py-3 flex-1 bg-[#f4f8fb] rounded-2xl overflow-y-scroll">
        {renderChatHistory}
      </div>
      <div className="h-16 flex justify-center items-center gap-4 rounded-lg">
        <input
          className="px-4 flex-1 leading-10 min-w-auto md:leading-12 text-base bg-[#eceef1] rounded-3xl"
          placeholder="Aa"
          value={inputMessage}
          onChange={handleChangeMessage}
          onKeyUp={handleEnter}
        />
        <button
          className="p-2 cursor-pointer hover:opacity-50"
          onClick={handleSendMessage}
        >
          <IoIosSend className="w-4 h-4 md:w-6 md:h-6" color="blue" />
        </button>
      </div>
    </div>
  );
};
