import * as PropTypes from 'prop-types';
import { SearchkitComponent, ViewOptionsAccessor, RenderComponentPropType } from '../../../core';
const defaults = require('lodash/defaults');
export class ViewSwitcherConfig extends SearchkitComponent {
    defineAccessor() {
        return new ViewOptionsAccessor('view', this.props.hitComponents);
    }
    render() {
        return null;
    }
}
ViewSwitcherConfig.propTypes = defaults({
    hitComponents: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        itemComponent: RenderComponentPropType,
        listComponent: RenderComponentPropType,
        defaultOption: PropTypes.bool
    }))
}, SearchkitComponent.propTypes);
//# sourceMappingURL=ViewSwitcherConfig.js.map