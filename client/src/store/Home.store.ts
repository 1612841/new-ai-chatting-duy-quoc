import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { TGetChatHistoryDto, TGetOnlineUserDto, TLoginDto } from 'types';
import { createJSONStorage, persist } from 'zustand/middleware';

const createInitialState = () => ({
  chatHistory: []
});

type THomeStore = {
  selectedUser?: TLoginDto;
  setSelectedUser: (selectedUser?: TLoginDto) => void;

  userList?: TGetOnlineUserDto[];
  setUserList: (userList?: TGetOnlineUserDto[]) => void;

  chatHistory: TGetChatHistoryDto[]
  setChatHistory: (chatHistory: TGetChatHistoryDto[]) => void

  resetChat: () => void
  reset: () => void;
};

export const useHomeStore = createWithEqualityFn<THomeStore>()(
  persist(
    (set) => ({
      ...createInitialState(),
      setSelectedUser: (selectedUser?: TLoginDto) => set({ selectedUser }),
      setUserList: (userList) => set({ userList }),
      setChatHistory: (chatHistory) => set({chatHistory}),
      resetChat: () => set({
        selectedUser: undefined,
        chatHistory: []
      }),
      reset: () => {
      useHomeStore.persist.clearStorage()
      window.location.reload()
    },
    }),
    {
      name: 'home-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        userList: state.userList,
        setUserList: state.setUserList,
      }),
    }
  ),

  shallow
);
