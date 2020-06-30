import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, PageSizeAccessor, HighlightAccessor, CustomHighlightAccessor, SourceFilterAccessor, HitsAccessor, RenderComponentPropType, renderComponent, block } from '../../../../core';
const map = require('lodash/map');
const defaults = require('lodash/defaults');
export class HitItem extends React.PureComponent {
    render() {
        return (React.createElement("div", { "data-qa": "hit", className: this.props.bemBlocks.item().mix(this.props.bemBlocks.container('item')) }, this.props.result._id));
    }
}
export class HitsList extends React.PureComponent {
    render() {
        const { hits, mod, className, itemComponent } = this.props;
        const bemBlocks = {
            container: block(mod).el,
            item: block(`${mod}-hit`).el
        };
        return (React.createElement("div", { "data-qa": "hits", className: bemBlocks.container().mix(className) }, map(hits, (result, index) => renderComponent(itemComponent, {
            key: `${result._id}_${result._index}`,
            result,
            bemBlocks,
            index
        }))));
    }
}
HitsList.defaultProps = {
    mod: 'sk-hits',
    itemComponent: HitItem
};
HitsList.propTypes = {
    mod: PropTypes.string,
    className: PropTypes.string,
    itemComponent: RenderComponentPropType,
    hits: PropTypes.any
};
export class Hits extends SearchkitComponent {
    componentDidMount() {
        super.componentDidMount();
        if (this.props.hitsPerPage) {
            this.searchkit.getAccessorByType(PageSizeAccessor).defaultSize = this.props.hitsPerPage;
        }
        if (this.props.highlightFields) {
            this.searchkit.addAccessor(new HighlightAccessor(this.props.highlightFields));
        }
        if (this.props.customHighlight) {
            this.searchkit.addAccessor(new CustomHighlightAccessor(this.props.customHighlight));
        }
        if (this.props.sourceFilter) {
            this.searchkit.addAccessor(new SourceFilterAccessor(this.props.sourceFilter));
        }
        this.hitsAccessor = new HitsAccessor({ scrollTo: this.props.scrollTo });
        this.searchkit.addAccessor(this.hitsAccessor);
    }
    render() {
        const hits = this.getHits();
        const hasHits = hits.length > 0;
        if (!this.isInitialLoading() && hasHits) {
            const { listComponent, mod, className, itemComponent } = this.props;
            return renderComponent(listComponent, {
                hits,
                mod,
                className,
                itemComponent
            });
        }
        return null;
    }
}
Hits.propTypes = defaults({
    hitsPerPage: PropTypes.number,
    highlightFields: PropTypes.arrayOf(PropTypes.string),
    sourceFilterType: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.bool
    ]),
    itemComponent: RenderComponentPropType,
    listComponent: RenderComponentPropType
}, SearchkitComponent.propTypes);
Hits.defaultProps = {
    listComponent: HitsList,
    scrollTo: 'body'
};
//# sourceMappingURL=Hits.js.map