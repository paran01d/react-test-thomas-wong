import React, { useEffect } from "react";
import { FormStatus, Message } from "./types";

interface Props {
  msgSentCallback: (message: Message) => void;
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
  const isDisableForm = formStatus === FormStatus.Sending || formStatus === FormStatus.Fail;
  const recipientRef = React.createRef<HTMLInputElement>();
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
      <header>Send SMS</header>
      <div className="flex-container">
        <div className="form-group">
          <label htmlFor="sender">Message will send from:</label>
          <input type="tel" id="sender" defaultValue={'61481074860'} readOnly/>
        </div>
        <div className="form-group">
          <label htmlFor="recipient">Enter your phone number:</label>
          <input type="tel" ref={recipientRef} id="recipient" value={recipient} placeholder="61412345678" onChange={(e)=>{
            setRecipient(e.target.value);
          }} />
          {recipientRef.current && <p className="error">Please check your input for field `{recipientRef.current.id}`</p>}
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
              // TODO: update with service call
              setTimeout(()=>{
                setFormStatus(FormStatus.Success);
                msgSentCallback({sender,body: message,recipient});
              },2000);
          }} disabled={isDisableForm}>Submit</button>
          <button onClick={clearForm} disabled={isDisableForm}>Clear Form</button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
