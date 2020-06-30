import { ValueState } from '../../core';
import { StatefulAccessor } from './StatefulAccessor';
export declare class ViewOptionsAccessor extends StatefulAccessor<ValueState> {
    state: ValueState;
    options: Array<any>;
    constructor(key: any, options: Array<any>);
    getSelectedOption(): any;
    setView(key: any): void;
    search(): void;
}
