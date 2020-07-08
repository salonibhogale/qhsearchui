import { State } from './State';
export declare class ObjectState extends State<Record<string, any>> {
    getValue(): Record<string, any>;
    hasValue(): boolean;
}
