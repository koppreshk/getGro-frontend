/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from 'modules/login';
import React from 'react';

class ServiceClient {
  private restURL: string | undefined;
  private headers = new Headers();
  private logout: () => void;

  constructor(args: { auth?: string; logout: () => void }) {
    this.restURL = import.meta.env.VITE_REST_URL;
    this.headers.append('Content-Type', 'application/json');
    this.headers.set('Authorization', args!.auth!);
    this.headers.set(
      'sub-domain',
      import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href
    );
    this.logout = args.logout;
  }

  private fetchData = (
    endPoint: string,
    init?: Pick<RequestInit, 'body' | 'method' | 'headers'>,
    _headers?: HeadersInit
  ) => {
    const combinedHeaders = new Headers(this.headers);

    // Merge extra headers
    if (_headers) {
      Object.entries(_headers).forEach(([key, value]) => {
        combinedHeaders.set(key, value as string);
      });
    }

    return fetch(`${this.restURL}${endPoint}`, {
      headers: combinedHeaders,
      body: init?.body,
      method: init?.method,
    })
      .then((res) => {
        if (res.status === 401) {
          this.logout();
        } else if (res.ok) {
          return res;
        }
        throw new Error(`StatusCode: ${res.status}`);
      })
      .catch((err) => Promise.reject(err));
  };

  public getData = (endPoint: string, headers?: HeadersInit) =>
    this.fetchData(endPoint, { method: 'GET' }, headers);

  public postData = (endPoint: string, body?: object, headers?: HeadersInit) =>
    this.fetchData(
      endPoint,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      headers
    );

  // NEW: post method for raw FormData, Blob, string, etc.
  public post = (endPoint: string, body: BodyInit, headers?: HeadersInit) => {
    // We intentionally skip setting Content-Type here for FormData
    const nonJsonHeaders = new Headers(this.headers);
    if (body instanceof FormData) {
      nonJsonHeaders.delete('Content-Type');
    }

    return this.fetchData(
      endPoint,
      {
        method: 'POST',
        body,
        headers: nonJsonHeaders,
      },
      headers
    );
  };
}
const arg: Pick<ServiceClient, 'getData' | 'postData' | 'post'> = {
  getData: (_endPoint: string, _headers?: HeadersInit) =>
    new Promise((res) => res),
  postData: (_endPoint: string, _body?: object, _headers?: HeadersInit) =>
    new Promise((res) => res),
  post: (_endPoint: string, _body: BodyInit, _headers?: HeadersInit) =>
    new Promise((res) => res),
};

const ServiceClientContext = React.createContext(arg);

// eslint-disable-next-line react/display-name
export const ServiceClientProvider = React.memo(
  (props: { children: React.ReactNode }) => {
    const { user, logout } = useAuth();
    return (
      <ServiceClientContext.Provider
        value={new ServiceClient({ auth: user?.authToken, logout: logout })}
      >
        {props.children}
      </ServiceClientContext.Provider>
    );
  }
);

export const useServiceClient = () => React.useContext(ServiceClientContext);
