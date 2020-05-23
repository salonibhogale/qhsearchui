import * as React from 'react';
import { mount } from 'enzyme';
import { Layout, LayoutBody, SideBar, ActionBar, ActionBarRow, TopBar, LayoutResults } from './Layout';
describe('Layout components', () => {
    it('should render correctly', () => {
        this.wrapper = mount(React.createElement("div", null,
            React.createElement(Layout, { size: "m" },
                React.createElement(TopBar, null, "search bar"),
                React.createElement(LayoutBody, null,
                    React.createElement(SideBar, null, "filters"),
                    React.createElement(LayoutResults, null,
                        React.createElement(ActionBar, null,
                            React.createElement(ActionBarRow, null, "row 1"),
                            React.createElement(ActionBarRow, null, "row 2")),
                        React.createElement("p", null, "hits"))))));
        expect(this.wrapper).toMatchSnapshot();
    });
    it('layout - no size prop', () => {
        this.wrapper = mount(React.createElement("div", null,
            React.createElement(Layout, null, "content")));
        expect(this.wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=Layout.unit.js.map