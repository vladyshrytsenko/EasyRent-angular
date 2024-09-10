import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Payment } from "../model/payment";

@Injectable({
    providedIn: 'root'
})
  
export class PaymentService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public processPayment(payment: Payment) : Observable<Payment> {
      return this.http.post<Payment>(`${this.apiServerUrl}/api/payments/process`, payment);
    } 
}
  