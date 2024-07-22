import { IPoint } from "./point.js";
/**
 * Interface provided by space function to operate with a space
 */
export interface ISpace {
    // Insert item in space
    insert: (item: any) => IPoint | undefined;
    // Returns a name of this interface space
    name: () => string;
}