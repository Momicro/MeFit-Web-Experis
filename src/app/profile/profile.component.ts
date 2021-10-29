import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment as ENV } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';
import { Profile } from '../models/profile.model';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  private _timeStamp! : number;
  private _profile : Profile = <Profile> {id:0, age:0, height:0, weight:0, fitnessLevel:0, trainingFrequency:0, contributorRequest:false};

  constructor(public router: Router, public authService: AuthService,
    private profileService: ProfileService) {
    super(router, authService);
  }

  get LinkAccountManagementUrl() {
    return ENV.keycloak.url+'/realms/'+ENV.keycloak.realm+'/account/';
  }

  private refreshProfilePicture() : void {
    this._timeStamp = (new Date()).getTime();
  }

  get ProfilePictureUrl() {
    let url = ENV.apiBaseUrl+'/api/v1/profiles/'+this.UserProfile.id+'/picture';
    if (this._timeStamp) {
        return url + '?' + this._timeStamp;
    }
    return url;
  }

  set UserProfile(value: Profile) {
    this._profile = value;
  }

  get UserProfile() {
    return this._profile;
  }

  ngOnInit(): void {
    console.log(this.authService.Profile);

    // get profile from auth service
    if (this.Profile !== undefined)
      this._profile = this.Profile;

  }

  onSubmit() {
    // save profile
    this.profileService.updateProfile(this.Profile).subscribe(profile => {
      // set profile in auth service
      this.Profile = this._profile;

      console.log("Profile updated", profile);
      this.router.navigate(["/","dashboard"])
     });

  }

  onFileSelected(event:any)
  {
    if (this.UserProfile.id > 0)
    {
      const file : File = event.target.files[0];

      if (file) {
        this.profileService.uploadProfilePicture(this.UserProfile.id, file).subscribe((response) =>
          {
            console.log('Picture uploaded.');
            this.refreshProfilePicture();
          },
          (error: HttpErrorResponse) => {
            console.log('Profile upload failed.', error);
          }
        );
      }
    }
  }

}
