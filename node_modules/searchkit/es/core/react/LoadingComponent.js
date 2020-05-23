import * as React from 'react';
import { SearchkitComponent } from './SearchkitComponent';
export class LoadingComponent extends SearchkitComponent {
    render() {
        if (this.isLoading()) {
            return this.props.children;
        }
        return React.createElement("div", null);
    }
}
//# sourceMappingURL=LoadingComponent.js.map