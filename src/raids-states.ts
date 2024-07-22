import { CursorFilter, CursorLogic, ISpace, Register } from "./types/index.js";
import { insertOne } from "./actions/index.js";
import { Cursor } from "./cursor.js";

/**
 * RaidsStates main class
 */
export class RaidsStates {
    /**
     * Register of points to access space tails
     */
    private _register: Register = {};


    public cursor(spaceName: string, logic?: CursorLogic, filter?: CursorFilter): Cursor | undefined {
        if (!this._register.hasOwnProperty(spaceName)) {
            return;
        }
        return new Cursor(
            this._register[spaceName],
            this._register[spaceName],
            logic,
            filter
        );
    }

    /**
     * Returns interface to operate with a space
     * @param {string} name
     * @returns {ISpace}
     * @example
     * space(spaceName) // Output: interface to communicate with a space
     */
    public space(name: string): ISpace {
        return {
            // insert item in to a space
            insert: insertOne.bind(this, this._register, name),
            // name of the space
            name: function(): string { return name; }
        };
    }
}