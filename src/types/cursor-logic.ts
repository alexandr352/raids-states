import { IChainStart, IPoint } from "./point";

export type CursorLogic = (data: any, point: IPoint, previousPoint: IChainStart | IPoint) => any;