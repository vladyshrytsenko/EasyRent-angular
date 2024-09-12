import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Availability } from "../../../model/availability";
import { Office } from "../../../model/office";

@Injectable({
    providedIn: 'root'
  })
  
  export class OfficeService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getById(id: number) : Observable<Office> {
      return this.http.get<Office>(`${this.apiServerUrl}/api/offices/${id}`);
    } 

    public findAll() : Observable<Office[]> {
        return this.http.get<Office[]>(`${this.apiServerUrl}/api/offices`);
    } 
  
    public create(office: Office) : Observable<Office> {
      return this.http.post<Office>(`${this.apiServerUrl}/api/offices`, office);
    } 
  
    public updateAvailabilityByOfficeId(id: number, availabilitie: Availability) : Observable<Office> {
      return this.http.put<Office>(`${this.apiServerUrl}/api/offices/${id}/availability`, availabilitie);
    } 
  
    public deleteById(id: number) : Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/offices/${id}`);
    } 
  
  }