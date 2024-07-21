import { IPoint, ISpace } from "./types";

/**
 * RaidsStates main class
 */
export class RaidsStates {
    /**
     * Register of points to access Space tails
     */
    private _spaces: {
        [name: string]: IPoint
    } = {};

    /**
     * Deletes one item from the space
     * @param {IPoint} item,
     * @param {string} name
     * @returns {any}
     * @example
     * delete(myItem, spaceName) // Output: myItem with no space connection
     */
    public delete(item: IPoint | undefined, name: string): any | undefined {
        // Abort deletion if there is no item or existing Space
        if (item == null || !this._spaces.hasOwnProperty(name)) {
            return;
        }
        // Check if item under the Space pointer
        if (this._spaces[name] === item) {
            // Check if there are more items in the space
            if (item.__prev) {
                // Removing pointer on current item from previous
                delete item.__prev.__next;
                // Moving Space pointer to the previous item
                this._spaces[name] = item.__prev;
                // Delete Raids connector
                delete item.__prev;
            } else {
                // As there is only one item in the Space, it can be deleted
                delete this._spaces[name];
            }
            // Return the item removed from the Space chain
            return item;
        }
        // If not at the space pointer, it should have __prev
        if (!item.__prev) {
            return;
        }
        // Deletion in the middle
        if (item.__next) {
            // Excluding item from the Space, connecting tails
            item.__next.__prev = item.__prev;
            item.__prev.__next = item.__next;
            // Delete Raids connector
            delete item.__next;
        // First added item will have no next chain link
        } else {
            // Delete connection leading to current item
            delete item.__prev.__next;
        }
        // Delete Raids connector
        delete item.__prev;
        // Return the item removed from the Space chain
        return item;
    }

    /**
     * Insets one item under Space
     * @param {any} item,
     * @param {string} name
     * @returns {IPoint}
     * @example
     * insert(myItem, spaceName) // Output: myItem with a Space connection
     */
    private insert(item: any, name: string): IPoint | undefined {
        // Abort if no item provided
        if (item == null) {
            return;
        }
        // If there is a Space with provided name
        if (this._spaces.hasOwnProperty(name)) {
            // Link old Space tail to current item
            this._spaces[name].__prev = item;
            // Connect item to the space chain
            item.__next = this._spaces[name];
        }
        // Move Space pointer to newly added item
        this._spaces[name] = item;
        // Return connected to the Space item
        return item;
    }

    /**
     * Returns interface to operate with a Space
     * @param {string} name
     * @returns {ISpace}
     * @example
     * space(spaceName) // Output: interface to communicate with a Space
     */
    public space(name: string): ISpace {
        return {
            // delete item from space
            delete: this.delete.bind(this, undefined, name),
            // insert item in to space
            insert: this.insert.bind(this, undefined, name),
            // name of the space
            name: function(): string { return name; }
        };
    }

}