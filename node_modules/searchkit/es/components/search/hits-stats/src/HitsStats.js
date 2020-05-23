import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, renderComponent } from '../../../../core';
const defaults = require('lodash/defaults');
const identity = require('lodash/identity');
const HitsStatsDisplay = (props) => {
    const { resultsFoundLabel, bemBlocks } = props;
    return (React.createElement("div", { className: bemBlocks.container(), "data-qa": "hits-stats" },
        React.createElement("div", { className: bemBlocks.container('info'), "data-qa": "info" }, resultsFoundLabel)));
};
export class HitsStats extends SearchkitComponent {
    constructor() {
        super(...arguments);
        this.translations = HitsStats.translations;
    }
    defineBEMBlocks() {
        return {
            container: this.props.mod || 'sk-hits-stats'
        };
    }
    render() {
        const timeTaken = this.searchkit.getTime();
        const { countFormatter } = this.props;
        const hitsCount = countFormatter(this.searchkit.getHitsCount());
        const props = {
            bemBlocks: this.bemBlocks,
            translate: this.translate,
            timeTaken: timeTaken,
            hitsCount: hitsCount,
            resultsFoundLabel: this.translate('hitstats.results_found', {
                timeTaken: timeTaken,
                hitCount: hitsCount
            })
        };
        return renderComponent(this.props.component, props);
    }
}
HitsStats.translations = {
    'hitstats.results_found': '{hitCount} results found in {timeTaken}ms'
};
HitsStats.propTypes = defaults({
    translations: SearchkitComponent.translationsPropType(HitsStats.translations),
    countFormatter: PropTypes.func
}, SearchkitComponent.propTypes);
HitsStats.defaultProps = {
    component: HitsStatsDisplay,
    countFormatter: identity
};
//# sourceMappingURL=HitsStats.js.map