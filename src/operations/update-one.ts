import { Cursor } from "../cursor.js";
import { Register } from "../types/index.js";
import { filterObject } from "../filters/object.js";
/**
 * Updates one document in collection.
 * @param {Cursor} cursor - Internal cursor provided by binding
 * @param {Register} collections - Collections register.
 * @param {string} name - Collection name.
 * @param {any} query - Query object.
 * @param {any} update - Update object.
 * @returns {any | undefined} Updated document.
 */
export function updateOne(
    cursor: Cursor, collections: Register, name: string, query: any, update: any
): any | undefined {
    // Sets internal cursor starting point
    if (!cursor.setChainStart(collections[name])) {
        // Returns undefined as there is no documents in collection.
        return;
    }
    // Sets filter to search for object-like query
    cursor.setFilter((value) => filterObject(query, value));
    // Sets logic to update document
    cursor.setLogic((document) => {
        // Checks if update object is provided
        if (!update || !Object.keys(update).length) {
            // Returns document as no update needed
            return document;
        }
        // Each key in query
        for (const key in update) {
            // Checks key to be own property
            if (!update.hasOwnProperty(key)) {
                continue;
            }
            // Updates document key property with new value
            document[key] = update[key];
        }
        return document;
    });
    // Returns first object updated
    return cursor.next();
}