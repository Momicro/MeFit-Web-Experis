import {Component, Input,  OnInit} from '@angular/core';
import {Goal} from "../../../../models/goal.model";
import {Workout} from "../../../../models/workout.model";
import {ProgramService} from "../../../programs/program.service";
import {WorkoutService} from "../../../workouts/workout.service";
import {DashboardService} from "../../../../dashboard/dashboard.service";
import {ExerciseService} from "../../../exercises/exercise.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {BaseComponent} from "../../../../base/base.component";

@Component({
  selector: 'goal-detail',
  templateUrl: './goal-detail-view.component.html',
  styleUrls: ['./goal-detail-view.component.css']
})
export class GoalDetailViewComponent extends BaseComponent implements OnInit{


  viewCompleted: boolean = false;

  @Input() goal!: Goal;

  constructor(public readonly router: Router, public readonly authService: AuthService, private readonly route: ActivatedRoute,
              private readonly programService: ProgramService,
              private readonly workoutService: WorkoutService,
              private readonly exerciseService: ExerciseService,
              private readonly dashboardService: DashboardService,) {
    super(router, authService)
  }


  ngOnInit(): void {
    this.checkDetailObject()
  }

//function to check if the goal has changed and pull the workoutList needed
  public checkDetailObject():void {
    let goal1 = this.dashboardService._goalList.filter(item => item.id == this.referenceSolver(this.router.url))[0]
    if (this.router.url.includes("/goals")&& this.goal!=goal1) {
      this.goal = goal1
    } else {
      this.goal = this.ActiveGoal
    }
    this.dashboardService.getGoalWorkoutList(this.goal)
    this.dashboardService.getCompletedGoalWorkoutList(this.goal)

  }


  daysLeft(endDate: Date): any {
    let today = new Date;
    let _endDate = new Date(endDate);
    return _endDate.getDate() - today.getDate() +1
  }

  referenceSolver(referenceURL: string) {
    let ref = referenceURL
    let pos = referenceURL.lastIndexOf("/") + 1

    return referenceURL.substr(pos, ref.length - pos)
  }

  progressBarStyling() {
    //set the view on true and after getting the completed workouts to false and to the old state in the end so the whole list is getting tracked
    let viewCheck = this.viewCompleted;
    this.viewCompleted= true;
    let progress = this.goalWorkoutList.length *100
    this.viewCompleted = false;
    progress = progress / this.goalWorkoutList.length
    this.viewCompleted = viewCheck
    if(progress < 20){
      return "20%"
    }
    return Math.ceil(progress) + "%"
  }

  //GETTER

  //checks if the goal is the right one and returns the selected goal
  get currentGoal(): Goal {
    if (this.router.url.includes("/goals")&& this.goal != this.dashboardService._goalList.filter(item => item.id == this.referenceSolver(this.router.url))[0]) {
      this.goal = this.dashboardService._goalList.filter(item => item.id == this.referenceSolver(this.router.url))[0]
    }
    return this.goal
  }

  //returns all goals of the user
  public get goalList(): Goal[] {
    return this.dashboardService._goalList.filter(item => this.referenceSolver(item.user) == this.authService.User.id.toString())
  }

  // returns all Workouts of a goal completed and pending
  get goalWorkoutList(): Workout[]{
    if(this.viewCompleted){
      return this.dashboardService._completedGoalWorkoutList
    }else {
      return this.dashboardService._goalWorkoutList.concat(this.dashboardService._completedGoalWorkoutList)
    }

  }

  //returns only the completed workouts of a goal
  get completedGoalWorkoutList() {
    return this.dashboardService._goalWorkoutList
  }

  gridRowEnd() {
    return Math.ceil(this.goalList.length+3)
  }
}
