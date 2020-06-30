import * as React from 'react';
import * as PropTypes from 'prop-types';
const omitBy = require('lodash/omitBy');
const isUndefined = require('lodash/isUndefined');
export const RenderComponentPropType = PropTypes.oneOfType([
    // function(props: any, propName: string) {
    //   if (isUndefined(props[propName]) || props[propName]['prototype'] instanceof React.Component) {
    //     return null
    //   }
    // },
    PropTypes.any,
    PropTypes.func
]);
export function renderComponent(component, props = {}, children = null) {
    const isReactComponent = component.prototype instanceof React.Component ||
        (component.prototype && component.prototype.isReactComponent) ||
        typeof component === 'function';
    if (isReactComponent) {
        return React.createElement(component, props, children);
    }
    else if (React.isValidElement(component)) {
        return React.cloneElement(component, omitBy(props, isUndefined), children);
    }
    console.warn('Invalid component', component);
    return null;
}
//# sourceMappingURL=RenderComponent.js.map