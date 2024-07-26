import {
    CursorFilter, CursorLogic,
    IChainStart, ICursorPoint, IPoint
} from "./types/index.js";
/**
 * Represents a database cursor.
 * @class
 */
export class Cursor {
    /**
     * Current point cursor pointing to.
     */
    private _pointer: ICursorPoint;

    /**
     * Creates a new cursor pointing to starting point in the chain.
     * @param {IChainStart} _chainStart - The start point of a space.
     * @param {CursorLogic} _logic - Logic executed by cursor.
     * @param {CursorFilter} _filter - Filters items to execute logic.
     */
    constructor(
        private _chainStart: IChainStart,
        private _logic: CursorLogic = (item: any) => item,
        private _filter: CursorFilter = () => true
    ) {
        this._pointer = this._chainStart;
    }

    /**
     * Checks if cursor reached the end of the chain.
     * @returns {boolean} If next iteration is possible.
     */
    public isCompleted(): boolean {
        return this._chainStart.last === this._pointer;
    }

    /**
     * Operation to move cursor in the chain one step.
     * The step is done when cursor finds next point, passing the filter,
     * and executes its logic. Or when the end of the chain is reached.
     * @returns {any | undefined} Returns the result of cursor logic execution.
     */
    public next(): any {
        // Checks if chain is finished
        if (this.isCompleted()) {
            // Returns undefined as the next step is not possible
            return;
        }
        // Checks if we have next item
        while(this._pointer.next) {
            // Searches item passing the filter
            if(this._filter(this._pointer.next.value)) {
                // Executes cursor logic
                const result = this._logic(this._pointer.next.value, this._pointer.next, this._pointer);
                // Moves pointer to the next point
                this._pointer = this._pointer.next;
                // Returns the result of logic execution
                return result;
            }
            // Moves pointer to the next point
            this._pointer = this._pointer.next;
        }
        // Returns undefined as no points left
        return;
    }

    /**
     * Sets chain starting point.
     * @param {IChainStart} newChainStart - The new starting point.
     * @returns {boolean} Returns if this operation was successful.
     */
    public setChainStart(newChainStart: IChainStart): boolean {
        // Checks if valid start pointed provided
        if (!newChainStart || !newChainStart.hasOwnProperty('last')) {
            // Returns fail
            return false;
        }
        // Sets new chain start
        this._chainStart = newChainStart;
        // Resets current pointer
        this._resetPointer();
        // Returns success
        return true;
    }

    /**
     * Sets new cursor logic function.
     * @param {CursorLogic} newLogic - New logic that will be executed by cursor.
     * @returns {boolean}  Returns if the new logic is set.
     */
    public setLogic(newLogic: CursorLogic): boolean {
        // Checks if new logic provided
        if (newLogic == null) {
            // The new logic was not set
            return false;
        }
        // Sets the new cursor logic
        this._logic = newLogic;
        // Returns success
        return true;
    }

    /**
     * Sets new cursor current point.
     * @param {ICursorPoint} newPoint - The new point to point cursor to.
     * @returns {boolean} Returns if this operation was successful.
     */
    public setPoint(newPoint: ICursorPoint): boolean {
        // Checks if new point provided
        if (newPoint == null) {
            // The new point was not set
            return false;
        }
        // Sets new cursor pointer
        this._pointer = newPoint;
        // Returns success
        return true;
    }

    /**
     * Sets new cursor filter function.
     * @param {CursorFilter} newFilter - New filter that will be used by cursor.
     * @returns {boolean}  Returns if the new filter is set.
     */
    public setFilter(newFilter: CursorFilter): boolean {
        // Checks if new filter function provided
        if (newFilter == null) {
            // The new filter was not set
            return false;
        }
        // Sets new filter
        this._filter = newFilter;
        // Returns success
        return true;
    }

    /**
     * Runs cursor through all the chain from the start to the end.
     */
    public update(): void {
        // Resets cursor position
        this._resetPointer();
        // Iterates through the chain
        while(!this.isCompleted()) {
            // Makes next step
            this.next();
        }
    }

    /**
     * Resets cursor pointer to the beginning of the chain.
     */
    private _resetPointer(): void {
        // Sets pointer as starting point of the chain
        this._pointer = this._chainStart;
    }
}