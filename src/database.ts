import { CursorFilter, CursorLogic, ICollection, Register } from "./types/index.js";
import { deleteOne, findOne, insertOne, updateOne } from "./operations/index.js";
import { filterObject } from "./filters/index.js";
import { Cursor } from "./cursor.js";
/**
 * Represents database.
 * @class
 */
export class Database {
    /**
     * Internal cursor link created with dummy start point.
     */
    private _cursor: Cursor  = new Cursor({last: {value: undefined}});

    /**
     * Collections register.
     */
    private _register: Register = {};


    /**
     * Creates new database cursor.
     * @param {string} collectionName - Collection name.
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
     * // Creates cursor for console-logging each item in collection
     * const logCursor = rs.cursor("mySpaceName", logLogic);
     * // Executes cursor logging every item in "mySpaceName"
     * logCursor.update();
     */
    public cursor(collectionName: string, logic?: CursorLogic, filter?: CursorFilter): Cursor | undefined {
        // Checks if collection with provided name exists
        if (!this._register.hasOwnProperty(collectionName)) {
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
        return new Cursor(this._register[collectionName], logic, filter);
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
            // Deletes document from collection
            deleteOne: deleteOne.bind(this, this._cursor, this._register, name),
            // Deletes collection
            drop: this.dropCollection.bind(this, name),
            // Inserts new document
            /**
             * @dev Collection will be created after first document is added.
             */
            insert: insertOne.bind(this, this._register, name),
            // Finds and returns one document
            findOne: findOne.bind(this, this._cursor, this._register, name),
            // Returns collection name
            name: function(): string { return name; },
            // Updates and returns one document
            updateOne: updateOne.bind(this, this._cursor, this._register, name)
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

    /**
     * Lists existing collections.
     * @returns {string[]} An array of existing collection names 
     * 
     * @example
     * 
     * // Gets an array of collection names
     * rs.listCollections();
     */
    public listCollections(): string[] {
        return Object.keys(this._register);
    }
}