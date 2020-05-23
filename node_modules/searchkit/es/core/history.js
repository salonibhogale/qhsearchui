import { createBrowserHistory, createMemoryHistory } from 'history';
const qs = require('qs');
export const encodeObjUrl = (obj) => qs.stringify(obj, { encode: true, encodeValuesOnly: true });
export const decodeObjString = (str) => qs.parse(str);
export const supportsHistory = () => typeof window !== 'undefined' && !!window.history;
export const createHistoryInstance = function () {
    return supportsHistory() ? createBrowserHistory() : createMemoryHistory();
};
//# sourceMappingURL=history.js.map