import {useState} from 'react';
import { MessageResponse } from './types';

export const useMessageResponse = () => {
  const [messageList, setMessageList] = useState<MessageResponse[]>([]);
  const clearMessages = () => setMessageList([]);
  return {messageList,clearMessages,setMessageList};
}