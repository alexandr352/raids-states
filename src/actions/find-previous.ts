import { IChainStart, IPoint } from "../types";
/**
 * Returns previous chain point for current item
 * @param {any} item
 * @param {IChainStart} chainStart
 * @returns {IPoint}
 * @example
 * findPrevious(item, spaceStartPoint) // Output: !Point with next connected to the item point
 */
export function findPrevious(item: any, chainStart: IChainStart): IChainStart | IPoint | undefined {
    // Pointer to iterate through chain
    let pointer: IChainStart | IPoint = chainStart;
    while(pointer.next) {
        // Next point is the one with the item we searching
        if (pointer.next.value === item) {
            // Returns current point as previous to next
            return pointer;
        }
        // Moving pointer to next point
        pointer = pointer.next;
    }
    // The Item is not from the space
    return undefined;
}