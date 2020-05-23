import * as React from 'react';
import * as PropTypes from 'prop-types';
import { QueryAccessor, SearchkitComponent } from '../../../core';
const defaults = require('lodash/defaults');
const throttle = require('lodash/throttle');
const assign = require('lodash/assign');
const isUndefined = require('lodash/isUndefined');
export class SearchBox extends SearchkitComponent {
    constructor(props) {
        super(props);
        this.translations = SearchBox.translations;
        this.state = {
            focused: false,
            input: undefined
        };
        this.lastSearchMs = 0;
        this.throttledSearch = throttle(() => {
            this.searchQuery(this.accessor.getQueryString());
        }, props.searchThrottleTime);
    }
    defineBEMBlocks() {
        return { container: this.props.mod };
    }
    defineAccessor() {
        const { id, prefixQueryFields, queryFields, queryBuilder, queryOptions, prefixQueryOptions } = this.props;
        return new QueryAccessor(id, {
            prefixQueryFields,
            prefixQueryOptions: assign({}, prefixQueryOptions),
            queryFields: queryFields || ['_all'],
            queryOptions: assign({}, queryOptions),
            queryBuilder,
            onQueryStateChange: () => {
                if (!this.unmounted && this.state.input) {
                    this.setState({ input: undefined });
                }
            }
        });
    }
    onSubmit(event) {
        event.preventDefault();
        this.searchQuery(this.getValue());
    }
    searchQuery(query) {
        const shouldResetOtherState = false;
        this.accessor.setQueryString(query, shouldResetOtherState);
        const now = +new Date();
        const newSearch = now - this.lastSearchMs <= 2000;
        this.lastSearchMs = now;
        this.searchkit.performSearch(newSearch);
    }
    getValue() {
        const { input } = this.state;
        if (isUndefined(input)) {
            return this.getAccessorValue();
        }
        return input;
    }
    getAccessorValue() {
        return (this.accessor.state.getValue() || '') + '';
    }
    onChange(e) {
        const query = e.target.value;
        if (this.props.searchOnChange) {
            this.accessor.setQueryString(query);
            this.throttledSearch();
            this.forceUpdate();
        }
        else {
            this.setState({ input: query });
        }
    }
    setFocusState(focused) {
        if (!focused) {
            const { input } = this.state;
            if (this.props.blurAction == 'search' &&
                !isUndefined(input) &&
                input != this.getAccessorValue()) {
                this.searchQuery(input);
            }
            this.setState({
                focused,
                input: undefined // Flush (should use accessor's state now)
            });
        }
        else {
            this.setState({ focused });
        }
    }
    render() {
        if (!this.accessor)
            return null;
        const block = this.bemBlocks.container;
        return (React.createElement("div", { className: block().state({ focused: this.state.focused }) },
            React.createElement("form", { onSubmit: this.onSubmit.bind(this) },
                React.createElement("div", { className: block('icon') }),
                React.createElement("input", { type: "text", "data-qa": "query", className: block('text'), placeholder: this.props.placeholder || this.translate('searchbox.placeholder'), value: this.getValue(), onFocus: this.setFocusState.bind(this, true), onBlur: this.setFocusState.bind(this, false), ref: "queryField", autoFocus: this.props.autofocus, onChange: this.onChange.bind(this) }),
                React.createElement("input", { type: "submit", value: this.translate('searchbox.button'), className: block('action'), "data-qa": "submit" }),
                React.createElement("div", { "data-qa": "loader", className: block('loader')
                        .mix('sk-spinning-loader')
                        .state({ hidden: !this.isLoading() }) }))));
    }
}
SearchBox.translations = {
    'searchbox.placeholder': 'Search',
    'searchbox.button': 'search'
};
SearchBox.defaultProps = {
    id: 'q',
    mod: 'sk-search-box',
    searchThrottleTime: 200,
    blurAction: 'search'
};
SearchBox.propTypes = defaults({
    id: PropTypes.string,
    searchOnChange: PropTypes.bool,
    searchThrottleTime: PropTypes.number,
    queryBuilder: PropTypes.func,
    queryFields: PropTypes.arrayOf(PropTypes.string),
    autofocus: PropTypes.bool,
    queryOptions: PropTypes.object,
    prefixQueryFields: PropTypes.arrayOf(PropTypes.string),
    prefixQueryOptions: PropTypes.object,
    translations: SearchkitComponent.translationsPropType(SearchBox.translations),
    mod: PropTypes.string,
    placeholder: PropTypes.string,
    blurAction: PropTypes.string
}, SearchkitComponent.propTypes);
//# sourceMappingURL=SearchBox.js.map