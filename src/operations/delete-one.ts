import { Cursor } from "../cursor.js";
import { IPoint, Register } from "../types/index.js";
import { filterObject } from "../filters/object.js";
/**
 * Deletes one document from collection.
 * @param {Cursor} cursor - Internal cursor provided by binding
 * @param {Register} collections - Collections register.
 * @param {string} name - Collection name.
 * @param {any} query - Query object.
 * @returns {any | undefined} Deleted document.
 */
export function deleteOne(
    cursor: Cursor, collections: Register, name: string, query: any
): any | undefined {
    // Sets internal cursor starting point
    if (!cursor.setChainStart(collections[name])) {
        // Returns undefined as there is no documents in collection.
        return;
    }
    // Sets filter to search for object-like query
    cursor.setFilter((value) => filterObject(query, value));
    // Sets logic to update document
    cursor.setLogic((document, point, previousPoint) => {
        /**
         * @dev This check comes first as the most likely condition
         */
        // Checks if this is not the last document in collection
        if (collections[name].last !== point) {
            /**
             * @dev As point is not the last in chain, it always has next.
             */
            // Excludes point from the chain connecting tails
            previousPoint.next = point.next;
            // Returns excluded point data
            return document;
        }
        /**
         * @dev The point is last in chain
         */
        // Checks if there are more documents in the collection
        if (collections[name] !== previousPoint) {
            // Sets last point to previous
            collections[name].last = previousPoint as IPoint;
        } else { // This is the only document in collection
            // Drop this collections
            delete collections[name];
        }
        return document;
    });
    // Returns first object deleted
    return cursor.next();
}