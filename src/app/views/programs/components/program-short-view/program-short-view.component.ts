import {Component, Input, OnInit} from '@angular/core';
import {Program} from "../../../../models/program.model";
import {Workout} from "../../../../models/workout.model";
import {WorkoutService} from "../../../workouts/workout.service";
import {Router} from "@angular/router";
import {DashboardService} from "../../../../dashboard/dashboard.service";

@Component({
  selector: 'program-short',
  templateUrl: './program-short-view.component.html',
  styleUrls: ['./program-short-view.component.css'],
})
export class ProgramShortViewComponent {

  @Input() program!: Program;


  constructor(public readonly dashboardService: DashboardService,
              public readonly workoutService: WorkoutService) {
  }


}
