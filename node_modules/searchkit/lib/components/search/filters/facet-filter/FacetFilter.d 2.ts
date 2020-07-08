import * as React from 'react';
import { FacetAccessor, ISizeOption } from '../../../../core';
import { SearchkitComponent } from '../../../../core/react';
import { CheckboxItemList, Panel } from '../../../ui';
import { FacetFilterProps } from './FacetFilterProps';
export declare class FacetFilter extends SearchkitComponent<FacetFilterProps, any> {
    accessor: FacetAccessor;
    static propTypes: any;
    static defaultProps: {
        listComponent: typeof CheckboxItemList;
        containerComponent: typeof Panel;
        size: number;
        collapsable: boolean;
        showCount: boolean;
        showMore: boolean;
        bucketsTransform: any;
    };
    constructor(props: any);
    getAccessorOptions(): {
        id: string;
        operator: string;
        title: string;
        size: number;
        include: string | string[];
        exclude: string | string[];
        field: string;
        translations: Record<string, any>;
        orderKey: string;
        orderDirection: string;
        fieldOptions: import("../../../../core").FieldOptions;
    };
    defineAccessor(): FacetAccessor;
    defineBEMBlocks(): {
        container: string;
        option: string;
    };
    componentDidUpdate(prevProps: any): void;
    toggleFilter(key: any): void;
    setFilters(keys: any): void;
    toggleViewMoreOption(option: ISizeOption): void;
    hasOptions(): boolean;
    getSelectedItems(): (string | number)[];
    getItems(): any;
    render(): React.ReactElement<any>;
    renderShowMore(): JSX.Element;
}
