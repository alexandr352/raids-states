import { IPoint, Register } from "../types/index.js";
/**
 * Insets one item under a space.
 * @param {Register} spaces - Spaces register.
 * @param {string} spaceName - Name of a space to insert the item.
 * @param {any} item - Data to be inserted.
 * @returns {any | undefined} Data added to the space.
 * 
 * @example
 * 
 * const item = insert(spaces, spaceName, item);
 * spaces[spaceName].last.value === item; // true
 */
export function insertOne(spaces: Register, spaceName: string, item: any): any | undefined {
    /**
     * @dev space and spaceName provided with bindings and should always be valid.
     */
    // Checks if item exists
    if (item == null) {
        // Returns undefined as insert was aborted
        return;
    }
    // Creates point from item
    const point: IPoint = {
        value: item
    }
    // Checks if space with provided name exists
    if (spaces.hasOwnProperty(spaceName)) {
        // Connects point to the last item in space
        spaces[spaceName].last.next = point;
        // Sets new last point in space
        spaces[spaceName].last = point;
        // Returns connected to the Space item
        return point.value;
    }
    // Creates new space with a given name by adding first item
    spaces[spaceName] = {
        next: point,
        last: point
    };
    // Returns newly created point value
    return point.value;
}