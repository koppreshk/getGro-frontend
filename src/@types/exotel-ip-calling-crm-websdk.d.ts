declare module 'exotel-ip-calling-crm-websdk' {

    export interface MakeCallCallback {
        (status: "success" | "failed", data: any): void;
    }
    export interface CallEventData {
        callId: string;
        remoteId: string;
        remoteDisplayName: string;
        callDirection: string;
        callState: string;
        callDuration: string;
        callStartedTime: string;
        callEstablishedTime: string;
        callEndedTime: string;
        callAnswerTime: string;
        callEndReason: string;
        sessionId: string;
        callFromNumber?: string;
        status?: string;
    }
    export type CallEvent = "incoming" | "connected" | "callEnded" | "holdtoggle" | "mutetoggle";
    /**
     * CallListenerCallback is to handle incoming call event
     */
    export interface CallListenerCallback {
        (event: CallEvent, callData: CallEventData): void;
    }
    export interface RegisterListenerCallback {
        (event: string): void;
    }
    export class ExotelWebPhoneSDK {
        #private;
        _softPhoneRegisterEventCallBack: RegisterListenerCallback;
        _softPhoneCallListenerCallback: CallListenerCallback;
        _softPhoneSessionCallback: any;
        constructor(accessToken: string, user: User);
        Initialize(sipInfo: SIPAccountInfo, callListenerCallback: CallListenerCallback, autoConnectVOIP: boolean | undefined, registerEventCallBack: RegisterListenerCallback | null, sessionCallback: any): ExotelWebPhoneSDK;
        RegisterDevice: () => void;
        UnRegisterDevice: () => void;
        /**
         * #callListenerCallback is a wrapper over the listener callback
         * provided at the time of initialisation to allow us to log stuff
         * @param callObj
         * @param eventType
         * @param sipInfo
         */
        CallListenerCallback: (callObj: any, eventType: CallEvent, sipInfo: SIPAccountInfo) => void;
        RegisterEventCallBack: (state: string, sipInfo: SIPAccountInfo) => void;
        SessionCallback: (state: string, sipInfo: SIPAccountInfo) => void;
        AcceptCall: () => void;
        HangupCall: () => void;
        MakeCall: (number: string, callback: MakeCallCallback) => Promise<void>;
        ToggleHold: () => void;
        ToggleMute: () => void;
        SendDTMF: (digit: string) => void;
    }

    export default class ExotelCRMWebSDK {
        #private;
        constructor(accesssToken: string, agentUserID: string, autoConnectVOIP?: boolean);
        /**
         * Initialize CRMWebSDK, Phone Object and registers callbacks
         * @param sofPhoneListenerCallback // For incoming calls
         * @param softPhoneRegisterEventCallBack
         * @param softPhoneSessionCallback
         * @returns
         */
        Initialize(sofPhoneListenerCallback: CallListenerCallback,
            softPhoneRegisterEventCallBack?: RegisterListenerCallback | null,
            softPhoneSessionCallback?: null): Promise<ExotelWebPhoneSDK>;
    }

}