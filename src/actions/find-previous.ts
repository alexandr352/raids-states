import { IChainStart, ICursorPoint, IPoint } from "../types/index.js";
/**
 * Returns previous chain point for current item.
 * @param {any} item - Data stored in point.
 * @param {IChainStart} chainStart - Start of the chain to search the item.
 * @returns {ICursorPoint | undefined} Point with next pointing to items point.
 * 
 * @example
 * 
 * const previousPoint = findPrevious(item, spaceStartPoint);
 * previous.next.value === item; // true
 */
export function findPrevious(item: any, chainStart: IChainStart): ICursorPoint | undefined {
    // Checks if required parameters exist
    if (!item || !chainStart) {
        // Returns undefined as operation was aborted
        return;
    }
    // Creates pointer to iterate through the chain
    let pointer: IChainStart | IPoint = chainStart;
    // Repeats search while we have next items in chain
    while(pointer.next) {
        // Checks if pointer is the previous point to item
        if (pointer.next.value === item) {
            // Returns point found
            return pointer;
        }
        // Moves pointer to the next point
        pointer = pointer.next;
    }
    // Returns undefined as item was not found in the space
    return undefined;
}