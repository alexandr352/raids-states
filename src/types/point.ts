/**
 * Interface added to any item to connect it to the space chain
 */
export interface IPoint {
    __next?: IPoint | undefined;
    __prev?: IPoint | undefined;
    __data: any;
}