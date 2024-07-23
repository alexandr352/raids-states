import { IPoint, Register } from "../types/index.js"
/**
 * Deletes one point from the space
 * @param {IPoint} item,
 * @param {Register} spaces,
 * @param {string} spaceName
 * @returns {any}
 * @example
 * delete(item, spaceName) // Output: item with no space connection
 */
export function deletePoint(point: IPoint | undefined, spaces: Register, spaceName: string): any | undefined {
    // Abort deletion if there is no item or existing Space
    if (point == null || !spaces.hasOwnProperty(spaceName)) {
        return;
    }
    // Check if item under the space pointer
    if (spaces[spaceName] === point) {
        // Check if there are more items in the space
        if (point.previous) {
            // Removing pointer on current item from previous
            delete point.previous.next;
            // Moving space pointer to the previous item
            spaces[spaceName] = point.previous;
            // Delete item space connection
            delete point.previous;
        } else {
            // As there is only one item in the space, it can be deleted
            delete spaces[spaceName];
        }
        // Return the item removed from the space chain
        return point.value;
    }
    // If not at the space pointer, it should have __prev
    if (!point.previous) {
        // Abort deletion in this case
        return;
    }
    // Deletion in the middle
    if (point.next) {
        // Excluding item from the space, connecting tails
        point.next.previous = point.previous;
        point.previous.next = point.next;
        // Delete Raids connector
        delete point.next;
    // First added item will have no next chain link
    } else {
        // Delete connection leading to current item
        delete point.previous.next;
    }
    // Delete item space connection
    delete point.previous;
    // Return the item removed from the space chain
    return point.value;
}