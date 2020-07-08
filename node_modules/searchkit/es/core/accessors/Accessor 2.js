import { Utils } from '../support';
const get = require('lodash/get');
const compact = require('lodash/compact');
export class Accessor {
    constructor() {
        this.active = true;
        this.translations = {};
        this.refCount = 0;
    }
    incrementRef() {
        this.refCount++;
    }
    decrementRef() {
        this.refCount--;
    }
    setActive(active) {
        this.active = active;
        return this;
    }
    setSearchkitManager(searchkit) {
        this.searchkit = searchkit;
        this.uuid = searchkit.guid();
        this.results = this.searchkit.results;
    }
    translate(key, interpolations) {
        const translation = (this.searchkit && this.searchkit.translate(key)) || this.translations[key] || key;
        return Utils.translate(translation, interpolations);
    }
    getResults() {
        return this.results;
    }
    setResults(results) {
        this.results = results;
    }
    getAggregations(path, defaultValue) {
        const results = this.getResults();
        const getPath = compact(['aggregations', ...path]);
        return get(results, getPath, defaultValue);
    }
    beforeBuildQuery() { }
    buildSharedQuery(query) {
        return query;
    }
    buildOwnQuery(query) {
        return query;
    }
}
//# sourceMappingURL=Accessor.js.map