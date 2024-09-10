import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUserById(id: number) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/api/users/${id}`);
  } 

  public findAll() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/api/users`);
  } 

  public registerUser(user: User) : Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/api/users/register`, user);
  } 

  public updateUser(id: number, user: User) : Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/api/users/${id}`, user);
  } 

  public deleteUserById(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/users/${id}`);
  } 

}
