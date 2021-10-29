import {Component, Input, OnInit} from '@angular/core';
import {Workout} from "../../../../models/workout.model";
import {Router} from "@angular/router";
import {ExerciseService} from "../../../exercises/exercise.service";
import {DashboardService} from "../../../../dashboard/dashboard.service";
import {BaseComponent} from "../../../../base/base.component";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'workout-short',
  templateUrl: './workout-short-view.component.html',
  styleUrls: ['./workout-short-view.component.css']
})
export class WorkoutShortViewComponent extends BaseComponent implements OnInit {

  @Input() workout!: Workout;

  constructor(public readonly router: Router, public readonly authService: AuthService,
              readonly exerciseService: ExerciseService,
              public dashboardService: DashboardService) { super(router, authService) }

  ngOnInit(): void {
    this.exerciseService.getExerciseList()
  }


  //Function to set the background color of the workout-short cards (change specific styling in css)
  completed() {
    if(this.router.url == "/dashboard" && this.ActiveGoal){
      return {
      pending: !this.workout.completed,
      completed: this.workout.completed
    }} if(this.router.url == "/workouts" || this.router.url ==  "/programs" || this.router.url ==  "/goals/set" || !this.ActiveGoal) {
      return {
        card: true,
      }
    } else {
      return {
        failed: !this.workout.completed,
        completed: this.workout.completed
      }
    }

  }

}
