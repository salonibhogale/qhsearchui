import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, ViewOptionsAccessor, RenderComponentPropType } from '../../../core';
import { Hits } from '../../';
const defaults = require('lodash/defaults');
export class ViewSwitcherHits extends SearchkitComponent {
    defineAccessor() {
        return new ViewOptionsAccessor('view', this.props.hitComponents);
    }
    render() {
        if (!this.accessor)
            return null;
        const selectedOption = this.accessor.getSelectedOption();
        const props = Object.assign(Object.assign({}, this.props), { itemComponent: selectedOption.itemComponent, listComponent: selectedOption.listComponent, mod: 'sk-hits-' + selectedOption.key });
        return React.createElement(Hits, Object.assign({}, props));
    }
}
ViewSwitcherHits.propTypes = defaults({
    hitComponents: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        itemComponent: RenderComponentPropType,
        listComponent: RenderComponentPropType,
        defaultOption: PropTypes.bool
    }))
}, Hits.propTypes);
//# sourceMappingURL=ViewSwitcherHits.js.map