import { Cursor } from "../cursor.js";
import { Register } from "../types/index.js";
import { filterObject } from "../filters/object.js";
/**
 * Finds and returns item using object as query.
 * @param {Cursor} cursor - Internal cursor provided by binding
 * @param {Register} spaces - Spaces register.
 * @param {string} spaceName - Name of the space where item is searched.
 * @param {any} query - Query object.
 * @returns {any | undefined} The first found or undefined if none.
 */
export function findOne(
    cursor: Cursor, spaces: Register, spaceName: string, query: any
): any | undefined {
    // Adjusts internal cursor starting point
    if (!cursor.setChainStart(spaces[spaceName])) {
        // Returns undefined as there is no chain start.
        return;
    }
    /**
     * @dev Filter and Logic are constants, setting them can't fail
     */
    // Sets filter to search for query
    cursor.setFilter((value) => filterObject(query, value));
    // Sets logic to return single item
    cursor.setLogic((item) => item);
    // Returns first object found
    return cursor.next();
}