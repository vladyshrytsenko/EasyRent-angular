import { Office } from "./office";

export interface Floor {
    id: number;
    svgPath: string;
    isAvailable: boolean;
    number: number;
    offices: Office[];
    photos: string[];
}