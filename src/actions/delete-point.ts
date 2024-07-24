import { ICursorPoint, IPoint, Register } from "../types/index.js"
/**
 * Deletes one point from the space.
 * @param {Register} spaces - Spaces register.
 * @param {string} spaceName - Name of the space to delete point from.
 * @param {IPoint} point - Point that should be deleted.
 * @param {ICursorPoint} previousPoint - Previous point in chain.
 * @returns {any | undefined} Deleted point data or undefined on fail.
 * 
 * @example
 * 
 * const item = deletePoint(spaces, "mySpace", point, previousPoint);
 * item === point.value; // true
 * previousPoint.next === item; // false
 */
export function deletePoint(
    spaces: Register, spaceName: string,
    point: IPoint, previousPoint: ICursorPoint
): any | undefined {
    // Aborts deletion if there is no item or space with provided name
    if (point == null || !spaces.hasOwnProperty(spaceName)) {
        // Returns undefined as deletion was aborted
        return;
    }
    /**
     * @todo Add check if the point belongs to the space
     */
    // Checks if point is last in the chain
    if (spaces[spaceName].last === point) {
        // Checks if there are more items in the space
        if (spaces[spaceName].next !== point) {
            /**
             * @dev Here previousPint is regular IPoint (not space start point)
             */
            // Deletes point connection
            delete previousPoint.next;
            // Sets new last item
            spaces[spaceName].last = previousPoint as IPoint;
        } else {
            // Deletes empty space
            delete spaces[spaceName];
        }
        // Returns deleted point data
        return point.value;
    }
    /**
     * @dev As point is not the last in chain, it always has next
     */
    // Excludes item from the chain connecting tails
    previousPoint.next = point.next;
    // Returns excluded point data
    return point.value;
}