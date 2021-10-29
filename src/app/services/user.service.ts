import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl : string = `${ENV.apiBaseUrl}/api/v1/users`;
  
  constructor(private http : HttpClient) { }

  getUser(id : number): Observable<User> 
  {
    return this.http.get<User>(this.apiBaseUrl+'/'+id);
  }

  updateUser(user: User): Observable<User> 
  {
    return this.http.put<User>(this.apiBaseUrl+'/'+user.id, user, ENV.httpOptions);
  }

  getUsersWithContributeRequests(): Observable<User[]>
  { 
    return this.http.get<User[]>(this.apiBaseUrl+'/contributorRequests');
  }

  grantContributorRequest(user : User) 
  {
    return this.http.put(this.apiBaseUrl+`/${user.id}/contributorRequests/grant`, null);
  }

}