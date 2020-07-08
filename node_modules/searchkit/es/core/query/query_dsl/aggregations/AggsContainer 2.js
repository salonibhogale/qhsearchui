const assign = require('lodash/assign');
const reduce = require('lodash/reduce');
const compact = require('lodash/compact');
export function AggsContainer(key, inner, aggsArray = []) {
    aggsArray = compact(aggsArray);
    if (aggsArray.length > 0) {
        inner.aggs = reduce(aggsArray, assign, {});
    }
    return {
        [key]: inner
    };
}
//# sourceMappingURL=AggsContainer.js.map