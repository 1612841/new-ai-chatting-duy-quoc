export type TError = {
  error: string;
};

export type TLoginPayload = {
  username: string;
};

export type TLoginDto = {
  id: string;
  username: string;
  online: boolean;
};

export type TLogoutPayload = {
  userId: string;
};

export type TLogoutDto = {
  message: string;
};

export type TGetChatHistoryPayload = {
  userId: string;
  receiverId: string;
};

export type TGetChatHistoryDto = {
  id: string;
  sender: {
    id: string;
    username: string;
  };
  receiver: {
    id: string;
    username: string;
  };
  message: string;
  timestamp: number;
};

export type TGetOnlineUserDto = TLoginDto;

export type TSocketOnlineUser = {
  event: string;
  data: TGetOnlineUserDto[];
};

export type TSocketSendMessage = {
  receiver: {
    id: string;
    username: string;
  };
  message: string;
};

export type TSocketReceiveMessage = {
  event: string;
  data: TGetChatHistoryDto;
};
