import React from "react";
import { useMessageResponse } from "./hook";

import MessageDisplay from "./MessageDisplay";
import MessageForm from "./MessageForm";
import { FormStatus } from "./types";

const MessagePage = () => {
  const {messageList, setMessageList, clearMessages} = useMessageResponse();
  return (
    <div className="MessagePage">
      <MessageForm 
        msgSentCallback={(message)=> {
          setMessageList([{
            receiveAt: new Date(),
            status: FormStatus.Success,
            ...message
          }, ...messageList]);
        }} />
      <MessageDisplay messageList={messageList} clearMsgList={clearMessages}/>
    </div>
  );
};

export default MessagePage;
