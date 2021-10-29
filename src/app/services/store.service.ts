import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role.model';
import { environment as ENV } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http : HttpClient) { }

  getUser(): Observable<User> {
    const uri = `${ENV.apiBaseUrl}/api/resources/user`;
    return this.http.get<User>(uri);
  }



}