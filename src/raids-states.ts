import { CursorFilter, CursorLogic, ISpace, Register } from "./types/index.js";
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
     * Register of points to access space tails.
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
     * Returns interface to operate with a space.
     * @param {string} name - The name of a space.
     * @returns {ISpace} Interface to Communicate with a space 
     * 
     * @example
     * 
     * // Creates interface to "mySpaceName" space
     * const mySpace = space("mySpaceName");
     */
    public space(name: string): ISpace {
        return {
            // Inserts new item in to the space
            insert: insertOne.bind(this, this._register, name),
            // Finds one item using object-like query
            findOne: findOne.bind(this, this._cursor, this._register, name),
            // Returns a name of this interface space
            name: function(): string { return name; }
        };
    }
}