const assign = require('lodash/assign');
export function QueryString(query, options = {}) {
    if (!query) {
        return;
    }
    return {
        query_string: assign({ query }, options)
    };
}
//# sourceMappingURL=QueryString.js.map