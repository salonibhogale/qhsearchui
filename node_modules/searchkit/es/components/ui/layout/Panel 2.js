import * as React from 'react';
import * as PropTypes from 'prop-types';
import { block } from '../../../core';
export class Panel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: props.defaultCollapsed
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.defaultCollapsed != this.props.defaultCollapsed) {
            this.setState({
                collapsed: nextProps.defaultCollapsed
            });
        }
    }
    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        const { title, mod, className, disabled, children, collapsable } = this.props;
        const collapsed = collapsable && this.state.collapsed;
        const containerBlock = block(mod).state({ disabled });
        let titleDiv;
        if (collapsable) {
            titleDiv = (React.createElement("div", { className: containerBlock.el('header').state({ collapsable, collapsed }), onClick: this.toggleCollapsed.bind(this) }, title));
        }
        else {
            titleDiv = React.createElement("div", { className: containerBlock.el('header') }, title);
        }
        return (React.createElement("div", { className: containerBlock.mix(className) },
            titleDiv,
            React.createElement("div", { className: containerBlock.el('content').state({ collapsed }) }, children)));
    }
}
Panel.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    mod: PropTypes.string,
    className: PropTypes.string,
    collapsable: PropTypes.bool,
    defaultCollapsed: PropTypes.bool
};
Panel.defaultProps = {
    disabled: false,
    collapsable: false,
    defaultCollapsed: true,
    mod: 'sk-panel'
};
//# sourceMappingURL=Panel.js.map