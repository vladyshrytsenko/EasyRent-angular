import { Office } from "./office";

export interface Availability {
    id: number;
    startDate: Date;
    endDate: Date;
    isBlocked: boolean;
    office: Office;
}