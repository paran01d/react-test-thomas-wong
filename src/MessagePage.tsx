import React from "react";
import { useMessageResponse } from "./hook";
import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";
import { MessageResponse } from "./types";

const MessagePage = () => {
  const {messageList, setMessageList, clearMessages} = useMessageResponse();
  
  const msgSentCallback = (message: MessageResponse) => {
    setMessageList([message, ...messageList]);
  };

  return (
    <div className="MessagePage">
      <MessageForm msgSentCallback={msgSentCallback}/>
      <MessageDisplay messageList={messageList} clearMsgList={clearMessages}/>
    </div>
  );
};

export default MessagePage;
