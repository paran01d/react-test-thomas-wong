export enum FormStatus {
  Standby,
  Sending,
  Fail,
  Success,
  Disabled,
}

export type Message = {
  sender: string,
  recipient: string,
  message: string,
}

export type MessageResponse = {
  id: string;
  receiveAt: string;
  cost: number;
} & Message;
