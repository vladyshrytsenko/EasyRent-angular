import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../model/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  public getUserById(id: number) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/api/users/${id}`);
  } 

  public getByUsername(username: string) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/api/users/username/${username}`);
  } 

  public getByEmail(email: string) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/api/users/email/${email}`);
  }

  public getByRole(role: string) : Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/api/users/role/${role}`);
  } 

  public findAll() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/api/users`);
  } 

  public register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/api/users/auth/register`, user);
  } 

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api/users/auth/authenticate`, { email, password });
  }

  public updateUser(id: number, user: User) : Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/api/users/${id}`, user);
  } 

  public deleteUserById(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/users/${id}`);
  } 



  public isAdmin(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const token = this.storageService.getJwtToken()!;
  
      if (token != null) {
        const payload = this.decodeToken(token);
        if (payload || payload.sub) {
          this.getByUsername(payload.sub).subscribe(
            (response: User) => {
              if (response.role === 'ADMIN') {
                observer.next(true);
              } else {
                observer.next(false);
              }
              observer.complete();
            },
            error => {
              console.error('Error fetching user:', error);
              observer.next(false);
              observer.complete();
            }
          );
        } else {
          observer.next(false);
          observer.complete();
        }
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  public getCurrentUser(): Observable<User> {
    return new Observable<User>((observer) => {
      const token = this.storageService.getJwtToken();
  
      if (token != null) {
        const payload = this.decodeToken(token);
        if (payload && payload.sub) {
          this.getByUsername(payload.sub).subscribe(
            (response: User) => {
              observer.next(response);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.error('Invalid token payload');
        }
      } else {
        observer.error('No token found');
      }
    });
  }  

  public decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }

}
