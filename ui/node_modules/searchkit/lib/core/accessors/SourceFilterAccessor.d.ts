import { SourceFilterType } from '../query';
import { Accessor } from './Accessor';
export declare class SourceFilterAccessor extends Accessor {
    source: SourceFilterType;
    constructor(source: SourceFilterType);
    buildSharedQuery(query: any): any;
}
