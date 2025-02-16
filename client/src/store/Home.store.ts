import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { TLoginDto } from 'types';

const createInitialState = () => ({});

type THomeStore = {
  selectedUser?: TLoginDto;
  setSelectedUser: (selectedUser?: TLoginDto) => void;

  reset: () => void;
};

export const useHomeStore = createWithEqualityFn<THomeStore>(
  (set) => ({
    ...createInitialState(),
    setSelectedUser: (selectedUser?: TLoginDto) => set({ selectedUser }),
    reset: () => set({ ...createInitialState() }),
  }),

  shallow,
);
