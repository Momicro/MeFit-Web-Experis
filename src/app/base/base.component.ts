import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from '../models/goal.model';
import { Profile } from '../models/profile.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styles: [
  ]
})
// https://www.digitalocean.com/community/tutorials/angular-component-inheritance
export class BaseComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { 
  }

  ngOnInit(): void {
  }

  openPage(routename: string) {
      this.router.navigateByUrl(`/${routename}`);
  }

  Logout() {
      this.authService.logout();
  }

  get UserID(): string {
      return this.authService.Username;
  }

  get UserFullName(): string {
      return this.authService.Name;
  }

  get Profile(): Profile {
    return this.authService.Profile;

  }

  set Profile(newProfile: Profile) {
    this.authService.Profile = newProfile;
  }

  get ProfileID() : number {
    if (this.Profile != null)
      return this.Profile.id;
    else
      return 0;
  }

  get ActiveGoal() : Goal {
    return this.authService.User.activeGoal;
  }

  public hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

}
