import { Office } from "./office";

export interface Floor {
    id: number;
    svgPath: string;
    isAvailable: boolean;
    offices: Office[];
}