export const createChatMessage = (messageText, sender, receiver) => {
  return {
    messageText,
    sender,
    receiver,
    date: new Date(),
    isMessageSeen: false,
  };
};

export const createChat = (chatId, messageText, receiver) => {
  return {
    _id: chatId,
    lastMessage: messageText,
    lastMessageDate: new Date(),
    receiver,
  };
};
