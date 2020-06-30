export class SearchRequest {
    constructor(transport, query, searchkit) {
        this.transport = transport;
        this.query = query;
        this.searchkit = searchkit;
        this.active = true;
    }
    run() {
        return this.transport
            .search(this.query)
            .then(this.setResults.bind(this))
            .catch(this.setError.bind(this));
    }
    deactivate() {
        this.active = false;
    }
    setResults(results) {
        if (this.active) {
            this.searchkit.setResults(results);
        }
    }
    setError(error) {
        if (this.active) {
            this.searchkit.setError(error);
        }
    }
}
//# sourceMappingURL=SearchRequest.js.map