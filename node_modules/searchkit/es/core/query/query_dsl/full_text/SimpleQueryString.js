const assign = require('lodash/assign');
export function SimpleQueryString(query, options = {}) {
    if (!query) {
        return;
    }
    return {
        simple_query_string: assign({ query }, options)
    };
}
//# sourceMappingURL=SimpleQueryString.js.map