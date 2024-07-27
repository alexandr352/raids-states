import { IPoint } from "./point.js";
/**
 * Collections interface.
 */
export interface ICollection {
    // Deletes document from collection
    deleteOne: (query: any) => any | undefined
    // Deletes collection
    drop: () => boolean;
    // Inserts new document
    insert: (item: any) => IPoint | undefined;
    // Finds one document using object-like query
    findOne: (query: any) => any | undefined;
    // Returns name of this interface collection
    name: () => string;
    // Updates and returns one document
    updateOne: (query: any, update: any) => any | undefined
}