import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
  
export class NotificationService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public sendBookingNotification(bookingId: number) : Observable<void> {
      return this.http.post<void>(`${this.apiServerUrl}/api/notifications/send/${bookingId}`, null);
    } 
}