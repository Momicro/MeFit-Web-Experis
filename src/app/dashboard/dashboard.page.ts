import {DashboardService} from "./dashboard.service";

import {  Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '../services/auth.service';
import {MuscleGroupService} from "../services/muscle-group.service";
import {WorkoutService} from "../views/workouts/workout.service";
import {Goal} from "../models/goal.model";
import {ProgramService} from "../views/programs/program.service";

@Component({
  selector: 'app-Dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage extends BaseComponent implements OnInit {

  constructor(public readonly router: Router, public readonly authService: AuthService,
              private readonly dashboardService: DashboardService,
              private readonly workoutService: WorkoutService,
              private readonly musclegroupService: MuscleGroupService,
              private readonly programService: ProgramService) {
    super(router, authService);
  }


  ngOnInit(): void{
    this.musclegroupService.getMusclegroupsList()
    this.workoutService.getWorkoutList()
    this.dashboardService.getGoalList()
    this.programService.getProgramList()
  }


  //Getter

  public get goalList(): Goal[] {
    return this.dashboardService._goalList
  }


  public get calendarArray() {
    return this.dashboardService.getCalendarDateArray()
  }

  public get currentDate() {
    return this.dashboardService.currentDate;
  }



}
