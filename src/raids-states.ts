import { Database } from "./database.js";
/**
 * RaidsStates main class.
 * @class
 */
export class RaidsStates {
    // RaidsStates singleton instance
    private static _instance: RaidsStates;
    // Database register
    private _register: Map<string, Database> = new Map();

    // Constructor is protected
    protected constructor() {}

    /**
     * Creates or returns existing RaidsStates instance.
     * @returns RaidsStates
     */
    public static instance(): RaidsStates {
        // Checks if instance is already exists
        if (!RaidsStates._instance) {
            // Creates new instance
            RaidsStates._instance = new RaidsStates();
        }
        // Returns RaidsStates instance
        return RaidsStates._instance;
    }

    /** Registers new database or gets existing
     * @param {string} name - Database name.
     * @returns {Database} Existing or new database.
     * 
     * @example
     * 
     * // Registers database "myDb"
     * const myDb = RaidsStates.register("myDb");
     * 
     * @dev As singleton, we can take public methods
     * from prototype on the instance it self.
     */
    public register = (name: string): Database => {
        if (!this._register.has(name)) {
            this._register.set(name, new Database());
        }
        return this._register.get(name)!;
    }

    /** Deletes database
     * @param {string} name - Database name.
     * @returns {boolean} true or false, if database was deleted.
     * 
     * @example
     * 
     * // Deletes database "myDb"
     * RaidsStates.remove("myDb");
     */
    public remove = (name: string): boolean => {
        if (!this._register.has(name)) {
            return false;
        }
        this._register.delete(name);
        return true;
    }
}