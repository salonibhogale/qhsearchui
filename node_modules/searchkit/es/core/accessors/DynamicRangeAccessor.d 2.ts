import { ObjectState } from '../state';
import { FieldOptions, FieldContext } from '../query';
import { FilterBasedAccessor } from './FilterBasedAccessor';
export interface DynamicRangeAccessorOptions {
    title: string;
    id: string;
    field: string;
    fieldOptions?: FieldOptions;
    rangeFormatter?: Function;
    translations?: Record<string, any>;
}
export declare class DynamicRangeAccessor extends FilterBasedAccessor<ObjectState> {
    options: any;
    fieldContext: FieldContext;
    state: ObjectState;
    static translations: any;
    translations: any;
    constructor(key: any, options: DynamicRangeAccessorOptions);
    getSelectedValue(value: any): string;
    buildSharedQuery(query: any): any;
    getStat(stat: any): any;
    isDisabled(): boolean;
    buildOwnQuery(query: any): any;
}
