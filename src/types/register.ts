import { IChainStart, IPoint } from "./point.js"
/**
 * Register is used to store space tail points
 */
export type Register = {
    [name: string]: IChainStart
}