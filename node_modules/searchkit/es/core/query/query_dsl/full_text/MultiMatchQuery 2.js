const assign = require('lodash/assign');
export function MultiMatchQuery(query, options) {
    if (!query) {
        return;
    }
    return {
        multi_match: assign({ query }, options)
    };
}
//# sourceMappingURL=MultiMatchQuery.js.map