import * as PropTypes from 'prop-types';
import { FacetAccessor, RenderComponentPropType } from '../../../../core';
import { SearchkitComponent } from '../../../../core/react';
const defaults = require('lodash/defaults');
export const FacetFilterPropTypes = defaults({
    field: PropTypes.string.isRequired,
    operator: PropTypes.oneOf(['AND', 'OR']),
    size: PropTypes.number,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    containerComponent: RenderComponentPropType,
    listComponent: RenderComponentPropType,
    itemComponent: RenderComponentPropType,
    translations: SearchkitComponent.translationsPropType(FacetAccessor.translations),
    orderKey: PropTypes.string,
    orderDirection: PropTypes.oneOf(['asc', 'desc']),
    include: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    exclude: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    showCount: PropTypes.bool,
    showMore: PropTypes.bool,
    fieldOptions: PropTypes.shape({
        type: PropTypes.oneOf(['embedded', 'nested', 'children']).isRequired,
        options: PropTypes.object
    }),
    countFormatter: PropTypes.func,
    bucketsTransform: PropTypes.func
}, SearchkitComponent.propTypes);
//# sourceMappingURL=FacetFilterProps.js.map