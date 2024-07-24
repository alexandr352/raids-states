import { ICursorPoint, IPoint } from "./point";
/**
 * Filter items while moving through the chain
 */
export type CursorFilter = (data: any) => boolean;

/**
 * Logic executed by cursor on items passing through the filter
 */
export type CursorLogic = (data: any, point: IPoint, previousPoint: ICursorPoint) => any;