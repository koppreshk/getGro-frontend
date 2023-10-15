/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

class ServiceClient {
    private restURL: string | undefined;
    private headers = new Headers();

    constructor() {
        this.restURL = import.meta.env.VITE_REST_URL;
        this.headers.append('Content-Type', 'application/json');
    }

    private fetchData = (endPoint: string, init?: Pick<RequestInit, 'body' | 'method'>, _headers?: HeadersInit) => {
        console.log(this.restURL);

        return fetch(`${this.restURL}${endPoint}`, {
            headers: this.headers,
            body: init?.body,
            method: init?.method
        }).then((res) => {
            if (res.status === 200) {
                return res;
            }
            throw new Error(`Something went wrong! Status Code: ${res.status} Message: ${res.statusText}`);
        }).catch((err) => {
            throw new Error(err);
        });
    }


    public getData = (endPoint: string, headers?: HeadersInit) => this.fetchData(endPoint, { method: 'GET' }, headers)

    public postData = (endPoint: string, body?: object, headers?: HeadersInit) => this.fetchData(endPoint, {
        method: 'POST',
        body: JSON.stringify(body)
    },
        headers)
}

const arg: Pick<ServiceClient, 'getData' | 'postData'> = {
    getData: (_endPoint: string, _headers?: HeadersInit) => new Promise((res) => res),
    postData: (_endPoint: string, _body?: object, _headers?: HeadersInit) => new Promise((res) => res)
};

const ServiceClientContext = React.createContext(arg);

export const ServiceClientProvider = React.memo((props: { children: React.ReactNode }) => {
    return (
        <ServiceClientContext.Provider value={new ServiceClient()}>
            {props.children}
        </ServiceClientContext.Provider>
    );
});

export const useServiceClient = () => React.useContext(ServiceClientContext);


