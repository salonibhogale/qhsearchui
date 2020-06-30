import { AxiosInstance, AxiosResponse } from 'axios';
import { ESTransport } from './ESTransport';
export interface ESTransportOptions {
    headers?: Record<string, any>;
    basicAuth?: string;
    withCredentials?: boolean;
    searchUrlPath?: string;
    timeout?: number;
}
export declare class AxiosESTransport extends ESTransport {
    host: string;
    static timeout: number;
    axios: AxiosInstance;
    options: ESTransportOptions;
    constructor(host: string, options?: ESTransportOptions);
    search(query: Record<string, any>): Promise<AxiosResponse>;
    getData(response: any): any;
    private static parseCredentials;
}
