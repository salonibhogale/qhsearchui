import { SearchkitComponent, FacetAccessor } from '../../../../core';
export class TagFilterConfig extends SearchkitComponent {
    defineAccessor() {
        const { field, id, operator, title } = this.props;
        return new FacetAccessor(id, {
            id,
            operator,
            title,
            size: 1,
            loadAggregations: false,
            field
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.operator != this.props.operator) {
            this.accessor.options.operator = this.props.operator;
            this.searchkit.performSearch();
        }
    }
    render() {
        return null;
    }
}
//# sourceMappingURL=TagFilterConfig.js.map