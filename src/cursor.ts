import { IPoint, CursorFilter, CursorLogic, IChainStart } from "./types/index.js";

export class Cursor {
    constructor(
        private _pointer: IChainStart | IPoint,
        private _chainStart: IChainStart,
        private _logic: CursorLogic = (item: any) => item,
        private _filter: CursorFilter = () => true
    ) {}

    public isCompleted(): boolean {
        return this._chainStart.last === this._pointer;
    }

    // Executes cursor one time, returns the logic result
    public next(): any {
        // Check if chain is finished
        if (this.isCompleted()) {
            return undefined;
        }
        // Searching item passing provided filter
        while(this._pointer.next) {
            if(this._filter(this._pointer.next.value)) {
                const result = this._logic(this._pointer.next.value, this._pointer.next, this._pointer);
                // Moves pointer to next point
                this._pointer = this._pointer.next;
                return result;
            }
            // Moves pointer to next point
            this._pointer = this._pointer.next;
        }
        // Chain is competed
        return undefined;
    }

    // Sets new cursor current point
    public setPoint(newPoint: IPoint): void {
        this._pointer = newPoint;
    }

    // Sets new cursor logic
    public setLogic(newLogic: CursorLogic): void {
        this._logic = newLogic;
    }

    // Sets new cursor filter
    public setFilter(newFilter: CursorFilter): void {
        this._filter = newFilter;
    }

    // Update all the chain moving cursor to the end
    public update(): void {
        this._resetCursor();
        // If the end of the chain reached
        while(!this.isCompleted()) {
            // Step
            this.next();
        }
    }

    private _resetCursor(): void {
        this._pointer = this._chainStart;
    }
}