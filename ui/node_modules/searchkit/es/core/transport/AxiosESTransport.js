import axios from 'axios';
import { ESTransport } from './ESTransport';
const defaults = require('lodash/defaults');
export class AxiosESTransport extends ESTransport {
    constructor(host, options = {}) {
        super();
        this.host = host;
        this.options = defaults(options, {
            headers: {},
            searchUrlPath: '/_search',
            timeout: AxiosESTransport.timeout
        });
        const credentials = AxiosESTransport.parseCredentials(this.options);
        const config = defaults(credentials, {
            baseURL: this.host,
            timeout: this.options.timeout,
            headers: this.options.headers
        });
        this.axios = axios.create(config);
    }
    search(query) {
        return this.axios.post(this.options.searchUrlPath, query).then(this.getData);
    }
    getData(response) {
        return response.data;
    }
    static parseCredentials(options) {
        const credentials = {};
        if (options.basicAuth !== undefined) {
            const parsed = options.basicAuth.split(':');
            const auth = { username: parsed[0], password: parsed[1] };
            credentials.auth = auth;
        }
        if (options.withCredentials) {
            credentials.withCredentials = true;
        }
        return credentials;
    }
}
AxiosESTransport.timeout = 5000;
//# sourceMappingURL=AxiosESTransport.js.map