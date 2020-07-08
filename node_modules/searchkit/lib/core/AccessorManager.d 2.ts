import { Accessor, StatefulAccessor, BaseQueryAccessor } from './accessors';
declare type StatefulAccessors = Array<StatefulAccessor<any>>;
export declare class AccessorManager {
    accessors: Array<Accessor>;
    statefulAccessors: {};
    queryAccessor: BaseQueryAccessor;
    constructor();
    getAccessors(): Accessor[];
    getActiveAccessors(): any;
    getStatefulAccessors(): StatefulAccessors;
    getAccessorsByType(type: any): any;
    getAccessorByType(type: any): any;
    add(accessor: any): any;
    remove(accessor: any): void;
    getState(): any;
    setState(state: any): void;
    notifyStateChange(oldState: any): void;
    getQueryAccessor(): BaseQueryAccessor;
    buildSharedQuery(query: any): any;
    buildOwnQuery(query: any): any;
    buildQuery(): any;
    setResults(results: any): void;
    resetState(): void;
}
export {};
