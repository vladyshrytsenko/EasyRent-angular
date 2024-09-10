import { Office } from "./office";

export interface Floor {
    id: number;
    svgPath: string;
    offices: Office[];
}