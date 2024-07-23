/**
 * Points are connected to create a store chain
 */
export interface IPoint {
    next?: IPoint | undefined;
    value: any;
}

/**
 * Start point of any chain
 */
export interface IChainStart {
    next: IPoint;
    last: IPoint;
}