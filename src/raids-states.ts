import { IPoint, ISpace, Register } from "./types";
import { deleteOne, insertOne } from "./actions";
/**
 * RaidsStates main class
 */
export class RaidsStates {
    /**
     * Register of points to access space tails
     */
    private _register: Register = {};

    /**
     * Returns interface to operate with a space
     * @param {string} name
     * @returns {ISpace}
     * @example
     * space(spaceName) // Output: interface to communicate with a space
     */
    public space(name: string): ISpace {
        return {
            // delete item from a space
            delete: deleteOne.bind(this, undefined, this._register, name),
            // insert item in to a space
            insert: insertOne.bind(this, undefined, this._register, name),
            // name of the space
            name: function(): string { return name; }
        };
    }
}