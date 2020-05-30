import * as React from 'react';
import { FastClick } from '../../../../core';
export class NoHitsErrorDisplay extends React.Component {
    render() {
        const { errorLabel, bemBlocks, resetSearchFn, tryAgainLabel } = this.props;
        return (React.createElement("div", { "data-qa": "no-hits", className: bemBlocks.container() },
            React.createElement("div", { className: bemBlocks.container('info') }, errorLabel),
            React.createElement("div", { className: bemBlocks.container('steps') },
                React.createElement(FastClick, { handler: resetSearchFn },
                    React.createElement("div", { className: bemBlocks.container('step-action') }, tryAgainLabel)))));
    }
}
//# sourceMappingURL=NoHitsErrorDisplay.js.map