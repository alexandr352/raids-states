import { IPoint, Register } from "../types"
/**
 * Deletes one item from the space
 * @param {IPoint} item,
 * @param {Register} spaces,
 * @param {string} spaceName
 * @returns {any}
 * @example
 * delete(myItem, spaceName) // Output: myItem with no space connection
 */
export function deleteOne(item: IPoint | undefined, spaces: Register, spaceName: string): any | undefined {
    // Abort deletion if there is no item or existing Space
    if (item == null || !spaces.hasOwnProperty(spaceName)) {
        return;
    }
    // Check if item under the space pointer
    if (spaces[spaceName] === item) {
        // Check if there are more items in the space
        if (item.__prev) {
            // Removing pointer on current item from previous
            delete item.__prev.__next;
            // Moving space pointer to the previous item
            spaces[spaceName] = item.__prev;
            // Delete item space connection
            delete item.__prev;
        } else {
            // As there is only one item in the space, it can be deleted
            delete spaces[spaceName];
        }
        // Return the item removed from the space chain
        return item;
    }
    // If not at the space pointer, it should have __prev
    if (!item.__prev) {
        // Abort deletion in this case
        return;
    }
    // Deletion in the middle
    if (item.__next) {
        // Excluding item from the space, connecting tails
        item.__next.__prev = item.__prev;
        item.__prev.__next = item.__next;
        // Delete Raids connector
        delete item.__next;
    // First added item will have no next chain link
    } else {
        // Delete connection leading to current item
        delete item.__prev.__next;
    }
    // Delete item space connection
    delete item.__prev;
    // Return the item removed from the space chain
    return item;
}