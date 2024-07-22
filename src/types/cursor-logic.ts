import { IPoint } from "./point";

export type CursorLogic = (data: any, point: IPoint, previousPoint: IPoint | undefined) => any;