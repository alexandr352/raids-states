/**
 * Interface added to any item to connect it to the space chain
 */
export interface IPoint {
    next?: IPoint | undefined;
    previous?: IPoint | undefined;
    value: any;
}