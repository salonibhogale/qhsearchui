import * as React from 'react';
import { FastClick } from '../../../../core';
export class NoHitsDisplay extends React.Component {
    getSuggestionAction() {
        const { suggestion, setSuggestionFn, bemBlocks, translate } = this.props;
        if (suggestion) {
            return (React.createElement(FastClick, { handler: setSuggestionFn },
                React.createElement("div", { className: bemBlocks.container('step-action') }, translate('NoHits.DidYouMean', { suggestion }))));
        }
        return null;
    }
    getResetFilterAction() {
        const { filtersCount, query, resetFiltersFn, bemBlocks, translate } = this.props;
        if (filtersCount > 0) {
            return (React.createElement(FastClick, { handler: resetFiltersFn },
                React.createElement("div", { className: bemBlocks.container('step-action') }, translate('NoHits.SearchWithoutFilters', { query }))));
        }
        return null;
    }
    render() {
        const { bemBlocks, noResultsLabel } = this.props;
        return (React.createElement("div", { "data-qa": "no-hits", className: bemBlocks.container() },
            React.createElement("div", { className: bemBlocks.container('info') }, noResultsLabel),
            React.createElement("div", { className: bemBlocks.container('steps') }, this.getSuggestionAction() || this.getResetFilterAction())));
    }
}
//# sourceMappingURL=NoHitsDisplay.js.map