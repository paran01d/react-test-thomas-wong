import React from "react";
import { MessageResponse } from "./types";

interface Props {
  messageList: MessageResponse[];
  clearMsgList: () => void;
}

const MessageDisplay: React.FC<Props> = ({messageList,clearMsgList}) => {
  return (
    <div className="MessageDisplay">
      <header>Sent SMS</header>
      <div className="flex-container">
        <table className="message-table">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Message</th>
              <th>Cost</th>
              <th>Receive at</th>
            </tr>
          </thead>
          <tbody>
          {messageList.map(({message,cost,recipient,receiveAt,id})=> {
            return (
              <tr key={id}>
                <td>
                  {recipient} 
                </td>
                <td>
                  {message} 
                </td>
                <td>
                  {cost} 
                </td>
                <td>
                  {new Date(receiveAt).toLocaleTimeString()}
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <button onClick={clearMsgList}>Clear Table</button>
      </div>
    </div>
  );
};

export default MessageDisplay;

