import { useMemo, useState } from 'react';
import { useHomeStore, useUserStore } from 'store';
import { User } from './User';
import { DefaultUser, NoUser } from 'assets';
import { useClickOutside } from '../Home.config';
import { use } from 'hooks';
import { getOnlineUser, logout } from 'apis';

export const UserList = () => {
  const setSelectedUser = useHomeStore((state) => state.setSelectedUser);
  const resetUserStore = useUserStore((state) => state.reset);
  const userInfo = useUserStore((state) => state.userInfo);

  const [openUserPopup, setOpenUserPopup] = useState(false);

  /* Apis */
  const userList = use(getOnlineUser, true);

  const renderUserList = useMemo(
    () =>
      !userList || userList.length === 1 ? (
        <div className="p-4 flex flex-col gap-1 items-center">
          <img
            className="w-10 h-10 mb-6 rounded-full"
            src={NoUser}
            alt="no-user-logo"
          />
          <p className="text-lg opacity-30">No user</p>
        </div>
      ) : (
        userList
          .filter((f) => f.id !== userInfo?.id)
          .map((user) => (
            <div
              key={user.id}
              className="px-3 py-2 flex items-center bg-white rounded-lg cursor-pointer gap-3 hover:bg-gray-200 transition-all ease-in-out duration-200"
              onClick={() => setSelectedUser(user)}
            >
              <User {...user} />
            </div>
          ))
      ),
    [userList]
  );

  const handleCloseUserPopup = () => setOpenUserPopup(false);

  const handleLogout = async () => {
    const res = await logout({ userId: userInfo?.id || '' });

    if (res) {
      resetUserStore();
      handleCloseUserPopup();
    }
  };

  const { dropdownRef, mainButtonRef } = useClickOutside(handleCloseUserPopup);

  return (
    <div className="flex-1">
      <div className="pr-4 mb-4 flex justify-between relative">
        <h1 className="font-bold text-xl text-center leading-10">Chats</h1>

        <img
          ref={mainButtonRef}
          src={DefaultUser}
          alt="user-logo"
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-50"
          onClick={() => setOpenUserPopup(!openUserPopup)}
        />

        <div
          ref={dropdownRef}
          className={`px-4 py-3 w-1/2 absolute top-12 right-0 flex flex-col justify-center items-center gap-4 bg-white rounded-lg transition-all ease-in-out duration-300 outline-1 ${
            openUserPopup ? 'visible opacity-100' : 'invisible opacity-0'
          } `}
        >
          <h5 className="font-semibold text-gray-500">{userInfo?.username}</h5>
          <button
            className="w-full leading-8 font-semibold cursor-pointer hover:bg-gray-300 rounded-lg outline-1"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="pr-4 flex flex-col flex-1 gap-4 max-h-[calc(100%-2.75rem)] overflow-y-auto">
        {renderUserList}
      </div>
    </div>
  );
};
