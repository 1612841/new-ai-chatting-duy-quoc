export const REST_API = {
  LOGIN: {
    uri: '/api/auth/login',
    method: 'POST',
  },
  LOGOUT: {
    uri: '/api/auth/logout',
    method: 'POST',
  },
  GET_CHAT_HISTORY: {
    uri: '/api/messages/history/:userId/:receiverId',
    method: 'GET'
  },
  GET_ONLINE_USER: {
    uri: '/api/users/online',
    method: 'GET'
  }
};
