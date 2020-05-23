import * as React from 'react';
import { TagFilter } from './TagFilter';
const map = require('lodash/map');
export class TagFilterList extends React.Component {
    render() {
        const { field, values, searchkit } = this.props;
        return (React.createElement("div", { className: "sk-tag-filter-list" }, map(values, (value) => (React.createElement(TagFilter, { key: value, field: field, value: value, searchkit: searchkit })))));
    }
}
//# sourceMappingURL=TagFilterList.js.map