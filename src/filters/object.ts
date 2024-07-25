/**
 * Filter function to handle query objects.
 * @param {any} query - Query object provided by user.
 * @param {any} value - Point value in the chain.
 * @returns {boolean} If value has the same property values as query
 * 
 * @example
 * 
 * filterObject({a: 1, b: 2}, {a: 1, b: 2, c: 3}); // true
 * filterObject({a: 1, b: 2}, {a: 4, b: 2, c: 3}); // false
 * 
 * @dev We have to check if query object is an object
 * and has a key, but this is not a good idea to put it here
 * as the filter will be executed on each value in chain
 * with no query changed.
 * @todo Add support for arrays and nested objects
 */
export function filterObject(query: any, value: any): boolean {
    // Checks if value is an object
    if (typeof value !== "object") {
        // If not an object the filter is not passing
        return false;
    }
    for (const key in query) {
        // Uses only own properties
        if (!query.hasOwnProperty(key)) {
            continue;
        }
        // Checks if object has the key from query object
        // Checks if item has the same property value as the query
        if (!value.hasOwnProperty(key) || value[key] !== query[key]) {
            // Returns filter not passing
            return false;
        }
    }
    // Returns filter passing
    return true;
}