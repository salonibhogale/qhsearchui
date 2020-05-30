import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitManager } from '../SearchkitManager';
export class SearchkitProvider extends React.Component {
    componentDidMount() {
        this.props.searchkit.setupListeners();
        this.props.searchkit.completeRegistration();
    }
    componentWillUnmount() {
        const { searchkit } = this.props;
        searchkit.unlistenHistory();
        searchkit.guidGenerator.reset();
    }
    getChildContext() {
        return { searchkit: this.props.searchkit };
    }
    render() {
        return this.props.children;
    }
}
SearchkitProvider.childContextTypes = {
    searchkit: PropTypes.instanceOf(SearchkitManager)
};
SearchkitProvider.propTypes = {
    searchkit: PropTypes.instanceOf(SearchkitManager).isRequired,
    children: PropTypes.element.isRequired
};
//# sourceMappingURL=SearchkitProvider.js.map