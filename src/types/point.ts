/**
 * Start point of any chain.
 */
export interface IChainStart extends ICursorPoint {
    last: IPoint;
}

/**
 * CursorPoints can be used by cursors.
 */
export interface ICursorPoint {
    next?: IPoint;
}

/**
 * Points are connected to create a store chain.
 */
export interface IPoint extends ICursorPoint {
    value: any;
}