import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, PaginationAccessor, RenderComponentPropType, renderComponent, block } from '../../../../core';
import { Toggle, Select } from '../../../ui';
import { Paginator } from './PaginationUtils';
const defaults = require('lodash/defaults');
const get = require('lodash/get');
const isNaN = require('lodash/isNaN');
export class Pagination extends SearchkitComponent {
    constructor(props) {
        super(props);
        this.translations = Pagination.translations;
        this.setPage = this.setPage.bind(this);
    }
    defineAccessor() {
        return new PaginationAccessor('p');
    }
    getCurrentPage() {
        return Number(this.accessor.state.getValue()) || 1;
    }
    getTotalPages() {
        return Math.ceil(this.getHitsCount() / get(this.getQuery(), 'query.size', 10));
    }
    isDisabled(pageNumber) {
        return isNaN(pageNumber) || pageNumber < 1 || pageNumber > this.getTotalPages();
    }
    normalizePage(page) {
        if (page === 'previous')
            return this.getCurrentPage() - 1;
        else if (page === 'next')
            return this.getCurrentPage() + 1;
        return +page;
    }
    setPage(page) {
        const pageNumber = this.normalizePage(page);
        if (this.isDisabled(pageNumber)) {
            return;
        }
        if (pageNumber == this.getCurrentPage()) {
            return; // Same page, no need to rerun query
        }
        this.accessor.state = this.accessor.state.setValue(pageNumber);
        this.searchkit.performSearch();
    }
    getPages() {
        const { showNumbers, pageScope, showText } = this.props;
        const currentPage = this.getCurrentPage();
        const totalPages = this.getTotalPages();
        const builder = Paginator.build({
            showNumbers,
            showFirst: true,
            showPrevious: showText,
            showNext: showText,
            showEllipsis: showText
        });
        return builder(currentPage, totalPages, this.translate, pageScope);
    }
    render() {
        if (!this.accessor)
            return null;
        if (!this.hasHits())
            return null;
        const className = block(this.props.mod).state({ numbered: this.props.showNumbers });
        const view = renderComponent(this.props.listComponent, {
            items: this.getPages(),
            selectedItems: [this.getCurrentPage()],
            toggleItem: this.setPage,
            setItems: (items) => {
                if (items && items.length > 0)
                    this.setPage(items[0]);
            },
            disabled: this.getTotalPages() <= 1
        });
        return React.createElement("div", { className: className }, view);
    }
}
Pagination.translations = {
    'pagination.previous': 'Previous',
    'pagination.next': 'Next'
};
Pagination.propTypes = defaults({
    translations: SearchkitComponent.translationsPropType(Pagination.translations),
    listComponent: RenderComponentPropType,
    pageScope: PropTypes.number,
    showNumbers: PropTypes.bool,
    showText: PropTypes.bool,
    showLast: PropTypes.bool
}, SearchkitComponent.propTypes);
Pagination.defaultProps = {
    listComponent: Toggle,
    pageScope: 3,
    showNumbers: false,
    showText: true,
    showLast: false,
    mod: 'sk-pagination-navigation'
};
export class PaginationSelect extends Pagination {
}
PaginationSelect.defaultProps = defaults({
    listComponent: Select,
    mod: 'sk-pagination-select',
    showNumbers: true,
    showText: false
}, Pagination.defaultProps);
//# sourceMappingURL=Pagination.js.map