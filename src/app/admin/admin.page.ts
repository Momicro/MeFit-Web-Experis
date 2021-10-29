import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { environment as ENV } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-Admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.css']
})
export class AdminPage extends BaseComponent implements OnInit {

  get KeycloakAdminUrl() {
    return ENV.keycloak.url+'/auth/admin';
  }

  private _users! : User[];

  constructor(public router: Router, public authService: AuthService,
              private userService: UserService) {
    super(router, authService);
  }

  public get Users() : User[] {
    return this._users;
  }

  ngOnInit(): void
  {
    this.getUsersWithContributeRequests();
  }

  private getUsersWithContributeRequests() {
    this.userService.getUsersWithContributeRequests().subscribe(users => {
      console.log("User with contribute requests", users);
      this._users = users;
    });
  }

  grantContributorAccess(user : User) : void {
    this.userService.grantContributorRequest(user).subscribe((response) => {
      console.log(`Contributor request for User-ID ${user.id} granted.`);
      this._users = this._users.filter(u => u.id != user.id);
    },
    (error: HttpErrorResponse) => {
      console.log(`Failed to grant contributor request for User-ID ${user.id}.`, error);
    });

  }

}
