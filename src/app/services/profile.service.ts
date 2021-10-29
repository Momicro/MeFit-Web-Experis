import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from 'src/environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiBaseUrl : string = `${ENV.apiBaseUrl}/api/v1/profiles`;
  
  constructor(private http : HttpClient) { }

  getProfile(id : number): Observable<Profile> 
  {
    return this.http.get<Profile>(this.apiBaseUrl+'/'+id);
  }

  updateProfile(profile: Profile): Observable<Profile> 
  {
    return this.http.put<Profile>(this.apiBaseUrl+'/'+profile.id, profile, ENV.httpOptions);
  }

  createProfile(profile: Profile) {
    console.log("Create profile", profile);

    this.http.post(ENV.apiBaseUrl+`/api/v1/profiles`, profile, ENV.httpOptions)
      .subscribe((response) => {
            console.log('Profile (ID: '+profile.id+') created.');
          },
          (error: HttpErrorResponse) => {
            console.log('Profile (ID: '+profile.id+') could not be created.', error);
          }
    );
  }

  uploadProfilePicture(profileId: number, picture: File) : Observable<Object> {
    
    const formData = new FormData();
    formData.append("file", picture);

    return this.http.post(ENV.apiBaseUrl+`/api/v1/profiles/${profileId}/picture`, formData)
  }

}