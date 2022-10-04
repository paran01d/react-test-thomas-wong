// there's a proxy config in package.json that specifies all unknown requests are proxied to the burstsms mtmo api
// this means instead of making a call to https://api.tp.mtmo.io/v1/sender you would call just /v1/sender

export type SendSMSResponse = {
  id: string,
  account_id: string,
  recipient: string,
  sender: string,
  country: string,
  message_ref: string,
  message: string,
  status: string,
  sms_count: number,
  gsm: boolean,
  created_at: string,
  updated_at: string,
  track_links: boolean
};

export const sendSMS = async (
  sender: string,
  recipient: string,
  message: string
): Promise<SendSMSResponse> =>  {
  const requestOptions = {
    method: 'POST',
    redirect: 'follow' as RequestRedirect,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REACT_APP_API_KEY || "",
    },
    body: JSON.stringify({sender,recipient,message})
  };
  const response = await fetch('/v1/sms', requestOptions);
  return response.json();
};
