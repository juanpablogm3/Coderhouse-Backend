import {ChatModel} from '../dao/mongoose/chat.model.js';

class ChatService {
  async getAllMessages() {
    try {
      const messages = await ChatModel.find({});
      const simplifiedMessages = messages.map((message) => ({
        id: message._id,
        user: message.user,
        message: message.message,
      }));
      return simplifiedMessages;
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { success: false, msg: 'Internal Server Error', payload: {} },
      };
    }
  }

  async addMessage(message) {
    try {
      const newMessage = await ChatModel.create(message);
      return {
        status: 200,
        result: {
          success: true,
          msg: 'Message added successfully',
          payload: newMessage,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { success: false, msg: 'Internal Server Error', payload: {} },
      };
    }
  }
}

export const chatService = new ChatService();