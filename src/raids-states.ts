import { CursorFilter, CursorLogic, ICollection, Register } from "./types/index.js";
import { findOne, insertOne } from "./actions/index.js";
import { filterObject } from "./filters/index.js";
import { Cursor } from "./cursor.js";
/**
 * RaidsStates main class.
 * @class
 */
export class RaidsStates {
    /**
     * Internal cursor link created with dummy start point.
     */
    private _cursor: Cursor  = new Cursor({last: {value: undefined}});

    /**
     * Register of collections.
     */
    private _register: Register = {};


    /**
     * Creates new database cursor.
     * @param {string} spaceName - The name of a space cursor connected to.
     * @param {CursorLogic} logic - (Optional) cursor logic function. Default: (i) => i.
     * @param {CursorFilter} filter - (Optional) cursor filter function. Default: () => true.
     * @returns { Cursor | undefined } Database cursor if it was created.
     * 
     * @example
     * 
     * // Creates cursor returning each item value
     * const mySpaceCursor = rs.cursor("mySpaceName");
     * // Defines cursor logic as console-logging function
     * const logLogic = (item) => { console.log(item); }
     * // Creates cursor for console-logging each item in the space
     * const logCursor = rs.cursor("mySpaceName", logLogic);
     * // Executes cursor logging every item in "mySpaceName"
     * logCursor.update();
     */
    public cursor(spaceName: string, logic?: CursorLogic, filter?: CursorFilter): Cursor | undefined {
        // Checks if the space with provided name exists
        if (!this._register.hasOwnProperty(spaceName)) {
            // Returns undefined as cursor was not created
            return;
        }
        // Checks if filter provided is an object
        if (typeof filter === "object") {
            // Closures query on provided object
            const query = filter;
            // Sets filter as default object filter
            filter = function(value) {
                // Uses provided object as a query
                return filterObject(query, value);
            }
        }
        // Creates and returns new cursor
        return new Cursor(this._register[spaceName], logic, filter);
    }

    /**
     * Returns interface to operate with collection.
     * @param {string} name - Collection name.
     * @returns {ICollection} Collection interface 
     * 
     * @example
     * 
     * // Creates interface to "c" collection
     * const myCollection = collection("myCollection");
     */
    public collection(name: string): ICollection {
        return {
            drop: this.dropCollection.bind(this, name),
            // Inserts new item
            insert: insertOne.bind(this, this._register, name),
            // Finds one item using object-like query
            findOne: findOne.bind(this, this._cursor, this._register, name),
            // Returns collection name
            name: function(): string { return name; }
        };
    }

    /**
     * Deletes collection by name.
     * @param {string} name - Collection name.
     * @returns {boolean} If operation was successful 
     * 
     * @example
     * 
     * // Deletes collection "myCollection"
     * rs.dropCollection("myCollection");
     */
    public dropCollection(name: string): boolean {
        if (!this._register.hasOwnProperty(name)) {
            return false;
        }
        delete this._register[name];
        return true;
    }
}