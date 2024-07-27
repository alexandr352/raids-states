import { IPoint } from "./point.js";
/**
 * Interface provided by space function to operate with a space.
 */
export interface ICollection {
    // Deletes collection
    drop: () => boolean;
    // Inserts new item
    insert: (item: any) => IPoint | undefined;
    // Finds one item using object-like query
    findOne: (query: any) => any | undefined;
    // Returns a name of this interface collection
    name: () => string;
}