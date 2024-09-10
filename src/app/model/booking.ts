import { Office } from "./office";
import { User } from "./user";

export interface Booking {

    id: number;
    startDate: Date;
    endDate: Date;
    office: Office;
    user: User;
    status: BookingStatus;
    rentalType: RentalType;
    totalPrice: number;
    isPaid: boolean;
}

export enum BookingStatus {
    Pending = 'PENDING',
    Confirmed = 'CONFIRMED',
    Canceled = 'CANCELED'
}

export enum RentalType {
    Hourly = 'HOURLY',
    Daily = 'DAILY',
    Monthly = 'MONTHLY',
    LongTerm = 'LONG_TERM'
}
