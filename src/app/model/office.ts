
import { Availability } from "./availability";
import { Booking } from "./booking";

export interface Office {
    id: number;
    name: string;
    description: string;
    photos: string[];
    hourlyPrice: number;
    dailyPrice: number;
    monthlyPrice: number;
    longTermPrice: number;
    bookings: Booking[];
    availabilities: Availability[];
}