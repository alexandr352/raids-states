import { IPoint, Register } from "../types/index.js"
/**
 * Deletes one point from the space
 * @param {Register} spaces
 * @param {string} spaceName
 * @param {IPoint} point
 * @param {IPoint} previousPoint,
 * @returns {any}
 * @example
 * delete(spaces, spaceName, point, pointBefore) // Output: item value with no space connection
 */
export function deletePoint(
    spaces: Register, spaceName: string,
    point: IPoint, previousPoint: IPoint
): any | undefined {
    // Abort deletion if there is no item or existing Space
    if (point == null || !spaces.hasOwnProperty(spaceName)) {
        return;
    }
    // Check if point is last in the chain
    if (spaces[spaceName].last === point) {
        // Check if there are more items in the space
        if (spaces[spaceName].next !== point) {
            // Removing pointer to current item from previous
            delete previousPoint.next;
            // Moving space pointer to the previous item
            spaces[spaceName].last = previousPoint;
        } else {
            // As there was only one item in the space, it can be deleted
            delete spaces[spaceName];
        }
        // Return the item removed from the space chain
        return point.value;
    }
    // If not last item in chain, it should have next
    // Excludes item from the chain
    previousPoint.next = point.next;
    // Return the item removed from the space chain
    return point.value;
}