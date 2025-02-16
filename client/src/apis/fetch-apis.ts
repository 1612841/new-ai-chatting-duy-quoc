import {
  TGetChatHistoryDto,
  TGetChatHistoryPayload,
  TGetUserOnlineDto,
  TLoginDto,
  TLoginPayload,
  TLogoutDto,
  TLogoutPayload,
} from 'types';
import { REST_API } from './apis';
import { httpServices } from './http-service';
import { generatePath } from 'react-router-dom';

const login = async (payload: TLoginPayload) => {
  const uri = REST_API.LOGIN.uri;
  return httpServices.post<TLoginPayload, TLoginDto>(uri, payload);
};

const logout = async (payload: TLogoutPayload) => {
  const uri = REST_API.LOGOUT.uri;
  return httpServices.post<TLogoutPayload, TLogoutDto>(uri, payload);
};

const getChatHistory = async ({ userId, receiverId }: TGetChatHistoryPayload) => {
  const uri = generatePath(REST_API.GET_CHAT_HISTORY.uri, { userId, receiverId });
  return await httpServices.get<Array<TGetChatHistoryDto>>(uri);
};

const getOnlineUser = async () => {
  const uri = REST_API.GET_ONLINE_USER.uri;
  return await httpServices.get<Array<TGetUserOnlineDto>>(uri);
};

export { login, logout, getChatHistory, getOnlineUser };
