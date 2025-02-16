import { getChatHistory } from 'apis';
import { DefaultUser } from 'assets';
import { use } from 'hooks';
import { memo, useMemo } from 'react';
import { useHomeStore, useUserStore } from 'store';

const ChattingHistoryComponent = () => {
  const { id: userId = '' } = useUserStore((state) => state.userInfo) || {};
  const { id: selectedUserId = '' } = useHomeStore((state) => state.selectedUser) || {};

  /*Apis */
  const data = use(
    () => getChatHistory({ userId, receiverId: selectedUserId }),
    !!userId && !!selectedUserId,
  );

  const renderHistory = useMemo(
    () =>
      (data || []).map(
        (
          {
            id,
            sender: { id: senderId, username: senderName },
            receiver: { id: recId, username: recName },
            message,
            timestamp,
          },
          index,
        ) => {
          const justify = userId === senderId ? 'justify-end' : 'justify-start';

          const senderAvatar =
            data?.[index + 1] &&
            data[index + 1].sender.id !== senderId &&
            senderId === selectedUserId ? (
              <img className="w-8 h-8 rounded-full object-cover" src={DefaultUser} alt="logo" />
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
            data?.[index + 1] &&
            (data[index + 1].sender.id !== senderId || data[index + 1].receiver.id !== recId)
              ? 'mb-4'
              : 'mb-2';

          return (
            <div key={id} className={messageSpace}>
              {/* <div>{timestamp}</div> */}
              <div className={`flex ${justify} items-center gap-2`}>
                {senderAvatar}
                {customMessage}
              </div>
            </div>
          );
        },
      ),
    [data],
  );

  return <>{renderHistory}</>;
};

export const ChattingHistory = memo(ChattingHistoryComponent);
