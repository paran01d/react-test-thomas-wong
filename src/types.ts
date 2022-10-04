export enum FormStatus {
    Standby,
    Sending,
    Fail,
    Success
  }
  
  export type Message = {
    sender: string,
    recipient: string,
    body: string,
  }

  export type MessageResponse = {
    status: FormStatus.Fail | FormStatus.Success;
    receiveAt: Date;
  } & Message;
  