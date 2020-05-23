import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitManager } from '../SearchkitManager';
import { Utils } from '../support';
import { block } from './block';
const mapValues = require('lodash/mapValues');
export class SearchkitComponent extends React.Component {
    constructor(props) {
        super(props);
        this.translations = {};
        this.unmounted = false;
        this.translate = this.translate.bind(this);
    }
    defineBEMBlocks() {
        return null;
    }
    defineAccessor() {
        return null;
    }
    translate(key, interpolations) {
        const translation = this.searchkit.translate(key) ||
            (this.props.translations && this.props.translations[key]) ||
            this.translations[key] ||
            key;
        return Utils.translate(translation, interpolations);
    }
    get bemBlocks() {
        return mapValues(this.defineBEMBlocks(), (cssClass) => block(cssClass).el);
    }
    get searchkit() {
        return this._searchkit || (this._searchkit = this._getSearchkit());
    }
    set searchkit(value) {
        this._searchkit = value;
    }
    _getSearchkit() {
        return this.props.searchkit || this.context.searchkit;
    }
    componentDidMount() {
        this._initAccessor();
        if (this.searchkit) {
            this.stateListenerUnsubscribe = this.searchkit.emitter.addListener(() => {
                if (!this.unmounted) {
                    this.forceUpdate();
                }
            });
        }
        this.forceUpdate();
    }
    _initAccessor() {
        if (this.searchkit && !this.accessor) {
            this.accessor = this.defineAccessor();
            if (this.accessor) {
                this.accessor = this.searchkit.addAccessor(this.accessor);
                return true;
            }
        }
        if (!this.searchkit) {
            console.warn('No searchkit found in props or context for ' + this.constructor.name);
        }
        return false;
    }
    componentWillUnmount() {
        if (this.stateListenerUnsubscribe) {
            this.stateListenerUnsubscribe();
        }
        if (this.searchkit && this.accessor) {
            this.searchkit.removeAccessor(this.accessor);
        }
        this.unmounted = true;
    }
    getResults() {
        return this.searchkit.results;
    }
    getHits() {
        return this.searchkit.getHits();
    }
    getHitsCount() {
        return this.searchkit.getHitsCount();
    }
    hasHits() {
        return this.searchkit.hasHits();
    }
    hasHitsChanged() {
        return this.searchkit.hasHitsChanged();
    }
    getQuery() {
        return this.searchkit.query;
    }
    isInitialLoading() {
        return this.searchkit.initialLoading;
    }
    isLoading() {
        return this.searchkit.loading;
    }
    getError() {
        return this.searchkit.error;
    }
}
SearchkitComponent.contextTypes = {
    searchkit: PropTypes.instanceOf(SearchkitManager)
};
SearchkitComponent.translationsPropType = (translations) => PropTypes.shape(mapValues(translations, () => PropTypes.string));
SearchkitComponent.propTypes = {
    mod: PropTypes.string,
    className: PropTypes.string,
    translations: PropTypes.objectOf(PropTypes.string),
    searchkit: PropTypes.instanceOf(SearchkitManager)
};
//# sourceMappingURL=SearchkitComponent.js.map