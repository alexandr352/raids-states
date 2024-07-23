import { IPoint, Register } from "../types/index.js";
/**
 * Insets one item under a space
 * @param {any} item
 * @param {Register} spaces
 * @param {string} spaceName
 * @returns {IPoint}
 * @example
 * insert(myItem, spaceName) // Output: myItem with a space connection
 */
export function insertOne(spaces: Register, spaceName: string, item: any): IPoint | undefined {
    // Abort if no item provided
    if (item == null) {
        return;
    }
    // Create point from item
    const point: IPoint = {
        value: item
    }
    // If there is a space with provided name
    if (spaces.hasOwnProperty(spaceName)) {
        // Connect point to last item in chain
        spaces[spaceName].last.next = point;
        // Move las item pointer to newly added point
        spaces[spaceName].last = point;
        // Return connected to the Space item
        return point.value;
    }
    // Add first item to the space
    spaces[spaceName] = {
        next: point,
        last: point
    };
    // Return connected to the Space item
    return point.value;
}