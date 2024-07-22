import { IPoint, CursorFilter, CursorLogic } from "./types/index.js";

export class Cursor {
    // Saves previous point for logic calls
    private _previousPoint: IPoint | undefined = undefined;

    constructor(
        private _pointer: IPoint,
        private _chainStart: IPoint,
        private _logic: CursorLogic = (item: any) => item,
        private _filter: CursorFilter = () => true
    ) {
        // TODO set _previousPoint
        // we have to know what chain is it on
    }

    public isCompleted(): boolean {
        return this._previousPoint === this._pointer
    }

    // Executes cursor one time, returns the logic result
    public next(): any {
        // Check if chain is finished
        if (this.isCompleted()) {
            return;
        }
        // Searching item passing provided filter
        while(true) {
            if(this._filter(this._pointer.value)) {
                const result = this._logic(this._pointer.value, this._pointer, this._previousPoint);
                this._previousPoint = this._pointer;
                if (this._pointer.next) {
                    this._pointer = this._pointer.next;
                }
                return result;
            }
            // Saving previous point
            this._previousPoint = this._pointer;
            // Moving pointer to next
            if (this._pointer.next) {
                this._pointer = this._pointer.next;
            } else {
                return;
            }
        }
    }

    // Sets new cursor current point
    public setPoint(newPoint: IPoint): void {
        this._pointer = newPoint;
        // TODO should be set to previous point
        this._previousPoint = undefined;
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
        // If the end of the chain reached
        while(!this.isCompleted()) {
            // Step
            this.next();
        }
    }

}