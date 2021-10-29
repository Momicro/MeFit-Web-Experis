import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment as ENV } from 'src/environments/environment';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user!: User;

    //public user$!: BehaviorSubject<User>;

    // Public properties
    public loading: boolean = false;

    // load user and create user
    // workflow description:
    // - load user data from JWT
    // - get User-ID from DB
    // - if user is not in DB (new registered user), create user and go to Profile
    // - if user is in DB, go to Dashboard
    constructor(private keycloak: KeycloakService, private http : HttpClient, private router : Router) {

        this.user = {} as User;

        this.loading = true;

        this.user.email = this.keycloak.getUsername();
        this.user.roles = this.keycloak.getUserRoles();

        this.keycloak.loadUserProfile().then(profile => { // load user profile from Keycloak
            this.user.firstName = profile.firstName!;
            this.user.lastName = profile.lastName!;

            console.log("Username: ", this.user.email);
            console.log("Roles: ", this.user.roles);

            this.loadAndCreateUser();
        });

    }

    private mapProfile(profile: Profile) {
        // needed to remove 'user' property, otherwise profile saving will fail, because profile model in API has no user property
        // here's the reason why DTO are usefull ;)
        return { id: profile.id,
                age: profile.age,
                fitnessLevel: profile.fitnessLevel,
                height: profile.height,
                trainingFrequency: profile.trainingFrequency,
                weight: profile.weight,
                contributorRequest: profile.contributorRequest } as Profile;
    }

    // create user from JWT token
    private createUser() {
        this.http.post<User>(ENV.apiBaseUrl+'/api/v1/users', null)
        .subscribe((response) => {
                        console.log("User ID: "+response.id);

                        this.User.id = response.id; // set user id
                        this.User.activeGoal = response.activeGoal;
                        this.User.profile = this.mapProfile(response.profile); // set profile
                        this.loading = false;

                        console.log("Redirect new user to Profile");
                        this.router.navigateByUrl('/profile'); // new user: go to [Profile]
                    },
                    (error: HttpErrorResponse) => {
                        console.log("User could not created", error);
                    }
        );
    }

    // get user id from database (query by email from jwt token)
    public loadAndCreateUser() {
        this.http.get<User>(ENV.apiBaseUrl+'/api/v1/users')
            .subscribe((response) => {
                            console.log("User found", response);

                            this.User.id = response.id; // set user id
                            this.User.activeGoal = response.activeGoal;
                            this.User.profile = this.mapProfile(response.profile); // set profile
                            this.loading = false;

                            console.log("Redirect existing user to Dashbord");
                            this.router.navigateByUrl('/dashboard'); // existing user: go to [Dashboard]
                        },
                        (error: HttpErrorResponse) => {
                            if (error.status == 404) {
                                console.log("User not found - creating new one");

                                this.createUser();
                            }
                        }
            );
    }

    get User() : User {
        return this.user;
    }

    get UserID(): number {
        return this.user.id;
    }

    get Username(): string {
        return this.user.email;
    }

    get Name(): string {
        return this.user.firstName+" "+this.user.lastName;
    }

    get Profile(): Profile {
        return this.user.profile;
    }

    set Profile(newProfile: Profile) {
        this.user.profile = newProfile;
    }

    hasRole(role: string) : boolean {
        return this.user.roles.includes(role);
    }

    async logout() {
        await this.keycloak.logout(window.location.origin);
    }

}
