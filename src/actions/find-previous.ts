import { IPoint } from "../types";
/**
 * Returns previous chain point for current item
 * @param {any} item
 * @param {IPoint} startPoint
 * @returns {IPoint}
 * @example
 * findPrevious(item, spaceStartPoint) // Output: !Point with next connected to the item point
 */
export function findPrevious(item: any, startPoint: IPoint): IPoint | undefined {
    // Pointer to iterate through chain
    let pointer = startPoint;
    // Stores previous chain point
    let previous;
    while(true) {
        // Current point is the one with the item we searching
        if (pointer.value === item) {
            // Returns previous point
            return previous;
        }
        // Check if we have next point
        if (pointer.next) {
            // Sets previous point to current
            previous = pointer;
            // Moving pointer to next point
            pointer = pointer.next;
        } else {
            // No item found
            // TODO fix undefined means chain start and nothing found.
            return undefined;
        }
    }
}