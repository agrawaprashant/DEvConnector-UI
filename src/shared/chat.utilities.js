export const createChatMessage = (messageText, sender, receiver) => {
  return {
    messageText,
    sender,
    receiver,
    date: new Date(),
  };
};

export const createChat = (chatId, messageText, sender, receiver) => {
  return {
    _id: chatId,
    lastMessage: messageText,
    users: [sender, receiver],
    messages: [],
    date: new Date(),
  };
};
