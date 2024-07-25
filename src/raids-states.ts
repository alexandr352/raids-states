import { CursorFilter, CursorLogic, ISpace, Register } from "./types/index.js";
import { insertOne } from "./actions/index.js";
import { Cursor } from "./cursor.js";

/**
 * RaidsStates main class.
 * @class
 */
export class RaidsStates {
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
     * 
     * @example
     * 
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
            // Returns name of the space interface connected to
            name: function(): string { return name; }
        };
    }
}