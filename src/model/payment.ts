
import { Booking } from "./booking";

export interface Payment {
    id: number;
    amount: number;
    booking: Booking;
    paymentMethod: string;
    paymentDate: Date;
    isSuccessful: boolean;
}