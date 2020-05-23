import * as React from 'react';
import { mount } from 'enzyme';
import { Panel } from './Panel';
describe('Panel', () => {
    beforeEach(() => {
        this.wrapper = mount(React.createElement(Panel, { title: "My Panel" },
            React.createElement("p", null, "panel content...")));
    });
    it('should render correctly', () => {
        expect(this.wrapper).toMatchSnapshot();
    });
    it('should be collapsable', () => {
        this.wrapper = mount(React.createElement(Panel, { title: "My Panel", collapsable: true },
            React.createElement("p", null, "panel content...")));
        expect(this.wrapper).toMatchSnapshot();
        const expectIsCollapsed = (shouldBeCollapsed) => {
            expect(this.wrapper.find('.sk-panel__content').hasClass('is-collapsed')).toBe(shouldBeCollapsed);
            expect(this.wrapper.find('.sk-panel__header').hasClass('is-collapsed')).toBe(shouldBeCollapsed);
        };
        //test collapsing
        expectIsCollapsed(true);
        this.wrapper.find('.sk-panel__header').simulate('click');
        expectIsCollapsed(false);
        this.wrapper.find('.sk-panel__header').simulate('click');
        expectIsCollapsed(true);
        this.wrapper.setProps({ defaultCollapsed: false });
        expectIsCollapsed(false);
    });
    it('can be disabled', () => {
        expect(this.wrapper.find('.sk-panel').hasClass('is-disabled')).toBe(false);
        this.wrapper.setProps({ disabled: true });
        expect(this.wrapper.find('.sk-panel').hasClass('is-disabled')).toBe(true);
    });
    it('mod + classname can be updated', () => {
        this.wrapper.setProps({ mod: 'sk-panel-updated', className: 'my-custom-class' });
        expect(this.wrapper.find('.sk-panel-updated').hasClass('my-custom-class')).toBe(true);
    });
    it('defaultCollapsed', () => {
        this.wrapper = mount(React.createElement(Panel, { title: "My Panel", collapsable: true, defaultCollapsed: false },
            React.createElement("p", null, "panel content...")));
        expect(this.wrapper.find('.sk-panel__header').hasClass('is-collapsable')).toBe(true);
        expect(this.wrapper.find('.sk-panel__header').hasClass('is-collapsed')).toBe(false);
    });
});
//# sourceMappingURL=Panel.unit.js.map