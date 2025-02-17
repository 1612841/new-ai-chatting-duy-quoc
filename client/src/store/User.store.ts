import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TLoginDto } from 'types';

const createInitialState = () => ({});

type TUserStore = {
  userInfo?: TLoginDto;
  setUserInfo: (userInfo?: TLoginDto) => void;

  userName?: string;
  setUserName: (userName?: string) => void;

  reset: () => void;
};

export const useUserStore = createWithEqualityFn<TUserStore>()(
  persist(
    (set) => ({
      ...createInitialState(),
      setUserInfo: (userInfo) => set({ userInfo }),
      setUserName: (userName) => set({ userName }),

      reset: () => {
        useUserStore.persist.clearStorage();
        window.location.reload();
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage)
    }
  ),
  shallow
);
