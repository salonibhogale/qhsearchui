const assign = require('lodash/assign');
export function MatchQuery(field, query, options = {}) {
    if (!query || !field) {
        return;
    }
    return {
        match: {
            [field]: assign({ query }, options)
        }
    };
}
//# sourceMappingURL=MatchQuery.js.map