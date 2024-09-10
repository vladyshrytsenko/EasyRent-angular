import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Booking } from "../model/booking";

@Injectable({
    providedIn: 'root'
  })
  
  export class BookingService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getById(id: number) : Observable<Booking> {
      return this.http.get<Booking>(`${this.apiServerUrl}/api/bookings/${id}`);
    } 

    public findAll() : Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.apiServerUrl}/api/bookings`);
      } 
  
    public create(booking: Booking) : Observable<Booking> {
      return this.http.post<Booking>(`${this.apiServerUrl}/api/bookings`, booking);
    } 
  
    public updateById(id: number, booking: Booking) : Observable<Booking> {
      return this.http.put<Booking>(`${this.apiServerUrl}/api/bookings/${id}`, booking);
    } 
  
    public deleteById(id: number) : Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/bookings/${id}`);
    } 
  
  }