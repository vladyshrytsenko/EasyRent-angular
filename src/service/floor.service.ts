import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Floor } from "../model/floor";

@Injectable({
    providedIn: 'root'
  })
  
  export class FloorService {
    private apiServerUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient) { }
  
    public getById(id: number) : Observable<Floor> {
      return this.http.get<Floor>(`${this.apiServerUrl}/api/floors/${id}`);
    }
  
    public findAll() : Observable<Floor[]> {
      return this.http.get<Floor[]>(`${this.apiServerUrl}/api/floors`);
    } 
  
    public create(floor: Floor, file: File): Observable<Floor> {
      const formData: FormData = new FormData();
      formData.append('floor', new Blob([JSON.stringify(floor)], { type: 'application/json' }));
      formData.append('file', file);
  
      return this.http.post<Floor>(`${this.apiServerUrl}/api/floors`, formData);
  }  
  
    public update(id: number, floor: Floor) : Observable<Floor> {
      return this.http.put<Floor>(`${this.apiServerUrl}/api/floors/${id}`, floor);
    } 
  
    public deleteById(id: number) : Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/floors/${id}`);
    } 
  
  }
  