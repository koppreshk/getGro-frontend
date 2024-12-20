import ExotelCRMWebSDK, {
  ExotelWebPhoneSDK,
  CallListenerCallback,
  RegisterListenerCallback,
  MakeCallCallback,
  IncomingCallDetails,
} from 'exotel-ip-calling-crm-websdk';
import { useAuth } from 'modules/login';
import { useFetchSDKToken } from 'modules/settings/apis/marketplace/exotel';
import React, { useContext, useEffect, useRef, useState } from 'react';

const defaultContextValues = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dial: (_obj: { phoneNumber: string }) => {},
  hangup: () => {},
  accept: () => {},
  isDeviceRegistered: false,
  callActive: false,
  isIncomingCall: false,
  incomingCallDetails: null,
} as IExotelServices;

interface IExotelServices {
  dial: (obj: { phoneNumber: string }) => void;
  hangup: () => void;
  accept: () => void;
  isDeviceRegistered: boolean;
  callActive: boolean;
  isIncomingCall: boolean;
  incomingCallDetails: null | IncomingCallDetails;
}

const ExotelServiceContext = React.createContext(defaultContextValues);

export const ExotelServiceProvider = (props: {
  children?: React.ReactNode;
}) => {
  const { user } = useAuth();
  const { data } = useFetchSDKToken(user ? true : false);
  const userId = user?.email || '';

  const webPhone = useRef<ExotelWebPhoneSDK | null>(null);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [incomingCallDetails, setIncomingCallDetails] =
    useState<IncomingCallDetails | null>(null);

  const handleCallEvents: CallListenerCallback = (eventType, moreInfo) => {
    switch (eventType) {
      case 'incoming':
        setIsIncomingCall(true);
        setIncomingCallDetails(moreInfo);
        break;
      case 'connected':
        setCallActive(true);
        break;
      case 'callEnded':
        setCallActive(false);
        setIsIncomingCall(false);
        setIncomingCallDetails(null);
        break;
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  };

  const registerationEvent: RegisterListenerCallback = (event) => {
    if (event === 'registered') {
      setIsDeviceRegistered(true);
      return;
    }
    if (event === 'unregistered') {
      setIsDeviceRegistered(false);
    }
  };

  const dialCallback: MakeCallCallback = (status, data) => {
    console.log('Inside dialCallback', status, data);
    if (status === 'success') {
      webPhone.current?.AcceptCall();
      setCallActive(true);
      return;
    }
    setCallActive(false);
  };

  const dial = (obj: { phoneNumber: string }) => {
    setCallActive(true);
    setIsIncomingCall(false);
    webPhone?.current?.MakeCall(obj.phoneNumber, dialCallback);
  };

  const hangup = () => {
    webPhone?.current?.HangupCall();
    setCallActive(false);
    setIsIncomingCall(false);
    setIncomingCallDetails(null);
  };

  const accept = () => {
    webPhone?.current?.AcceptCall();
  };

  useEffect(() => {
    async function init() {
      if (webPhone.current) {
        return;
      }
      const crmWebSDK = new ExotelCRMWebSDK(data!.access_token, userId, true);
      const crmWebPhone = await crmWebSDK.Initialize(
        handleCallEvents,
        registerationEvent
      );
      webPhone.current = crmWebPhone;
    }
    if (data?.access_token) {
      init();
    }
  });

  const valueObject = {
    dial,
    hangup,
    accept,
    isDeviceRegistered,
    callActive,
    isIncomingCall,
    incomingCallDetails,
  };
  return (
    <ExotelServiceContext.Provider value={valueObject}>
      {props.children}
    </ExotelServiceContext.Provider>
  );
};

export const useExotelServices = () => useContext(ExotelServiceContext);
