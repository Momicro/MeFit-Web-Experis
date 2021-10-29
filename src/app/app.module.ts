import { environment as ENV } from 'src/environments/environment';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
//import { LoginPage } from './login/login.page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import {DashboardPage} from "./dashboard/dashboard.page";
import { ProfileComponent } from './profile/profile.component';
//import { RegistrationComponent } from './registration/registration.component';
import { WorkoutsComponent } from './views/workouts/components/workout-page/workouts.component';
import { ProgramsComponent } from './views/programs/components/program-page/programs.component';
import { ExercisesComponent } from './views/exercises/components/exercise-page/exercises.component';
import { ProgramDetailViewComponent } from './views/programs/components/program-detail-view/program-detail-view.component';
import { ProgramShortViewComponent } from './views/programs/components/program-short-view/program-short-view.component';
import { ExerciseDetailViewComponent } from './views/exercises/components/exercise-detail-view/exercise-detail-view.component';
import { ExerciseShortViewComponent } from './views/exercises/components/exercise-short-view/exercise-short-view.component';
import {WorkoutShortViewComponent} from "./views/workouts/components/workout-short-view/workout-short-view.component";
import {WorkoutDetailViewComponent} from "./views/workouts/components/workout-detail-view/workout-detail-view.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoalShortViewComponent } from './views/goals/components/goal-short-view/goal-short-view.component';
import { GoalDetailViewComponent } from './views/goals/components/goal-detail-view/goal-detail-view.component';
import { GoalSetViewComponent } from './views/goals/components/goal-set-view/goal-set-view.component';
import { AdminPage } from './admin/admin.page';
import { SelectionWindowComponent } from './dashboard/components/selection-window/selection-window.component';

//pass the wished parameters to keycloak
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: ENV.keycloak.url,
        realm: ENV.keycloak.realm,
        clientId: ENV.keycloak.client
      },
      enableBearerInterceptor: true,
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'login-required',
        redirectUri: window.location.origin // + '/login'
        /*
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
        */
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    AdminPage,
    DashboardPage,
    ProfileComponent,
    WorkoutsComponent,
    ProgramsComponent,
    ExercisesComponent,
    ProgramDetailViewComponent,
    ProgramShortViewComponent,
    WorkoutShortViewComponent,
    WorkoutDetailViewComponent,
    ExerciseDetailViewComponent,
    ExerciseShortViewComponent,
    GoalShortViewComponent,
    GoalDetailViewComponent,
    GoalSetViewComponent,
    SelectionWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    FormsModule,
    CommonModule,
    NgbModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
