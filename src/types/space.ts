import { IPoint } from "./point";
export interface ISpace {
    insert: (item: any) => IPoint | undefined;
    delete: (item: IPoint) => any;
    name: () => string;
}