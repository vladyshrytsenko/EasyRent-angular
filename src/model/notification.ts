
import { Booking } from "./booking";
import { User } from "./user";

export interface Notification {
    id: number;
    message: string;
    sentAt: Date;
    manager: User;
    booking: Booking;
}