import { ValueState } from '../state';
import { StatefulAccessor } from './StatefulAccessor';
export declare class PageSizeAccessor extends StatefulAccessor<ValueState> {
    defaultSize: number;
    state: ValueState;
    constructor(defaultSize: number);
    setSize(size: any): void;
    getSize(): number;
    buildSharedQuery(query: any): any;
}
