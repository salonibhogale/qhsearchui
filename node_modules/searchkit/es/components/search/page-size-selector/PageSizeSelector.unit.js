import * as React from 'react';
import { mount } from 'enzyme';
import { PageSizeAccessor, SearchkitManager } from '../../../core';
import { Toggle, PageSizeSelector, Hits } from '../../';
describe('PageSizeSelector', () => {
    beforeEach(() => {
        this.searchkit = SearchkitManager.mock();
        this.setWrapper = (props = {}) => {
            this.wrapper = mount(React.createElement("div", null,
                React.createElement(PageSizeSelector, Object.assign({ options: [4, 12, 24], searchkit: this.searchkit }, props)),
                React.createElement(Hits, { hitsPerPage: 12, searchkit: this.searchkit })));
            this.searchkit.setResults({
                hits: {
                    hits: [
                        { _id: 1, title: 1 },
                        { _id: 2, title: 2 }
                    ],
                    total: 2
                }
            });
            this.accessor = this.searchkit.getAccessorByType(PageSizeAccessor);
        };
    });
    it('getSize()', () => {
        this.setWrapper();
        expect(this.accessor.getSize()).toBe(12);
        this.accessor.state = this.accessor.state.setValue('24');
        expect(this.accessor.getSize()).toBe(24);
    });
    it('should render and behave correctly', () => {
        this.setWrapper();
        expect(this.wrapper).toMatchSnapshot();
        const option24 = this.wrapper
            .find('select')
            .children()
            .at(2);
        option24.simulate('change');
        expect(this.accessor.getSize()).toBe(24);
    });
    it('should set mod, className, custom listComponent', () => {
        this.setWrapper({
            mod: 'my-page-selector',
            className: 'my-class',
            listComponent: Toggle
        });
        expect(this.wrapper).toMatchSnapshot();
    });
});
//# sourceMappingURL=PageSizeSelector.unit.js.map