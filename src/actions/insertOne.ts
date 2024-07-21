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
export function insertOne(item: any, spaces: Register, spaceName: string): IPoint | undefined {
    // Abort if no item provided
    if (item == null) {
        return;
    }
    // If there is a space with provided name
    if (spaces.hasOwnProperty(spaceName)) {
        // Link old space tail to current item
        spaces[spaceName].previous = {
            value: item,
            // Connect item to the space chain
            next: spaces[spaceName]
        };
    }
    // Move Space pointer to newly added item
    spaces[spaceName] = {
        value: item
    };
    // Return connected to the Space item
    return item;
}