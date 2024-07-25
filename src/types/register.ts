import { IChainStart } from "./point.js"
/**
 * Register is used to store space start points.
 */
export type Register = {
    [name: string]: IChainStart
}