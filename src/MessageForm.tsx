import React, { useEffect } from "react";
import { sendSMS, SendSMSResponse } from "./service";
import { FormStatus, MessageResponse } from "./types";

interface Props {
  msgSentCallback: (response: MessageResponse) => void;
}

type Feedback = {
  status: FormStatus,
  alert: string
}

const FeedbackAlert = ({status, alert}: Feedback): JSX.Element => {
  let className = 'hidden';
  if(status === FormStatus.Fail) {
    className = 'error';
  }
  if(status === FormStatus.Success) {
    className = 'success';
  }
  return <p style={{margin: 0, marginBottom: '1rem'}} className={[className,'feedback'].join(" ")}>{alert}</p>
}

const getAlertByFormStatus = (status: FormStatus, recipient: string): Feedback => {
  let alert = "";
  switch(status) {
    case FormStatus.Fail: 
      alert = "Fail to send message please try again later";
      break;
    case FormStatus.Success: 
      alert = `Your message has been sent to ${recipient} successfully`;
      break;
    default:
      break;
  }
  return {alert,status}
}

const defaultFeedback: Feedback = {status: FormStatus.Standby, alert: ''};

const MessageForm: React.FC<Props> = ({msgSentCallback}) => {
  const sender = '61481074860';
  const [recipient, setRecipient] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [formStatus, setFormStatus] = React.useState<FormStatus>(FormStatus.Standby);
  const [feedback, setFeedback] = React.useState<Feedback>(defaultFeedback);
  const [smsThreshold, setSmsThreshold] = React.useState(3);
  const isDisableForm = formStatus === FormStatus.Sending || formStatus === FormStatus.Disabled;
  const clearForm = () => {
    setRecipient("");
    setMessage("");
    setFormStatus(FormStatus.Standby);
    setFeedback(defaultFeedback);
  }
  useEffect(() => {
    setFeedback(
      getAlertByFormStatus(formStatus, recipient)
    );
  }, [formStatus, recipient]);
  return ( 
    <div className="MessageForm">
      <header>Send SMS [{smsThreshold} messages left]</header>
      <div className="flex-container">
        <div className="form-group">
          <label htmlFor="sender">Message will send from:</label>
          <input type="tel" id="sender" defaultValue={'61481074860'} readOnly/>
        </div>
        <div className="form-group">
          <label htmlFor="recipient">Enter your phone number:</label>
          <input type="tel" id="recipient" value={recipient} placeholder="61412345678" onChange={(e)=>{
            setRecipient(e.target.value);
          }} />
        </div>
        <div className="form-group">
          <label htmlFor="message">Input your message here:</label>
          <textarea value={message} id="message" onChange={(e)=>{setMessage(e.target.value)}} />
        </div>
        <FeedbackAlert {...feedback} />
        <div className="form-group">
          <button onClick={()=>{
              if(!recipient && !message) {
                return;
              }
              setFormStatus(FormStatus.Sending);
              sendSMS(sender,recipient,message)
              .then(({id, sender, recipient, message, created_at, sms_count}: SendSMSResponse)=>{
                const messageLeft = smsThreshold - 1;
                setFormStatus(messageLeft > 0 ? FormStatus.Success : FormStatus.Disabled);
                setSmsThreshold(messageLeft);
                msgSentCallback({
                  id,
                  recipient,
                  message,
                  sender,
                  receiveAt:created_at,
                  cost: sms_count
                });
              }).catch(() => {
                setFormStatus(FormStatus.Fail);
              })
          }} disabled={isDisableForm}>Submit</button>
          <button onClick={clearForm} disabled={isDisableForm}>Clear Form</button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
