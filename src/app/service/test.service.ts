import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
  
export class TestService {
  
    constructor(private http: HttpClient) { }
  
    public fetchData() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    } 
}