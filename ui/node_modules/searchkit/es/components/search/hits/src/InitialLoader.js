import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, renderComponent } from '../../../../core';
const defaults = require('lodash/defaults');
export class InitialViewDisplay extends React.PureComponent {
    render() {
        return (React.createElement("div", { className: this.props.bemBlocks.container() },
            React.createElement("div", { "data-qa": "initial-loading", className: this.props.bemBlocks.container('initial-loading') })));
    }
}
export class InitialLoader extends SearchkitComponent {
    defineBEMBlocks() {
        const block = this.props.mod || 'sk-initial-loader';
        return {
            container: block
        };
    }
    render() {
        if (this.isInitialLoading()) {
            return renderComponent(this.props.component, {
                bemBlocks: this.bemBlocks
            });
        }
        return null;
    }
}
InitialLoader.defaultProps = {
    component: InitialViewDisplay
};
InitialLoader.propTypes = defaults({
    component: PropTypes.func
}, SearchkitComponent.propTypes);
//# sourceMappingURL=InitialLoader.js.map