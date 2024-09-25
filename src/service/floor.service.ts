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

  public getById(id: number): Observable<Floor> {
    return this.http.get<Floor>(`${this.apiServerUrl}/api/floors/${id}`);
  }

  public findAll(): Observable<Floor[]> {
    return this.http.get<Floor[]>(`${this.apiServerUrl}/api/floors`);
  }

  public create(floor: Floor, svg: File, photos: FileList): Observable<Floor> {
    const formData: FormData = new FormData();
    formData.append('floor', new Blob([JSON.stringify(floor)], { type: 'application/json' }));
    formData.append('svg', svg);

    Array.from(photos).forEach(photo => {
      formData.append('photos', photo);
    });

    return this.http.post<Floor>(`${this.apiServerUrl}/api/floors`, formData);
  }

  public update(id: number, floor: Floor, photos: FileList): Observable<Floor> {
    const formData: FormData = new FormData();
    formData.append('floor', new Blob([JSON.stringify(floor)], { type: 'application/json' }));

    Array.from(photos).forEach(photo => {
      formData.append('photos', photo);
    });


    return this.http.put<Floor>(`${this.apiServerUrl}/api/floors/${id}`, formData);
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/floors/${id}`);
  }

}
