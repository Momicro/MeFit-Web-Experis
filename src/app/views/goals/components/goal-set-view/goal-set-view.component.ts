import { Component, OnInit } from '@angular/core';
import {Program} from "../../../../models/program.model";
import {Workout} from "../../../../models/workout.model";
import {ProgramService} from "../../../programs/program.service";
import {WorkoutService} from "../../../workouts/workout.service";
import {Exercise} from "../../../../models/exercise.model";
import {ExerciseService} from "../../../exercises/exercise.service";
import {DashboardService} from "../../../../dashboard/dashboard.service";
import {BaseComponent} from "../../../../base/base.component";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {GoalAPI} from "../../../../models/goal.model";

@Component({
  selector: 'goal-set',
  templateUrl: './goal-set-view.component.html',
  styleUrls: ['./goal-set-view.component.css']
})


export class GoalSetViewComponent extends BaseComponent implements OnInit {
  maxBarColor: any = '#4CAF50';
  currentDate:any = this.dashboardService.currentDate;
  model: any= {year: this.currentDate.getFullYear(), month: this.currentDate.getMonth()+1, day: this.currentDate.getDate()}
  maxBarStylingText: string = "0%";

  constructor(public readonly router: Router, public readonly authService: AuthService,
              private readonly programService: ProgramService,
              private readonly workoutService: WorkoutService,
              private readonly exerciseService: ExerciseService,
              public dashboardService: DashboardService) {
    super(router, authService );
  }

  ngOnInit(): void {
    this.dashboardService.checkLocalStorage()
  }

//GETTER


  get programList(): Program[] {
    return this.programService._programList
  }

  get workoutList(): Workout[] {
    return this.workoutService._workoutList
  }

  public get exerciseList(): Exercise[] {
    return this.exerciseService._exerciseList
  }

  //styles the progressbar for the goalsetup. factor 3 is for 3 units per day, so you can calculate a level by the frequency

  maxBarStyling() {
    if(this.Profile != undefined) {
      let maxUnitsAmount: any = this.Profile.trainingFrequency/(100/7)*3
      console.log(maxUnitsAmount)
      let selectedProgramsWorkoutsCounter =0;
      for (let program of this.dashboardService.selectedProgramsList()){
        selectedProgramsWorkoutsCounter += program.workouts.length
      }
      let unitsCount = selectedProgramsWorkoutsCounter + this.dashboardService.selectedWorkoutsList().length
      let value = Math.ceil((unitsCount/maxUnitsAmount)*100)
      if(value > 100) {
        this.maxBarColor = 'red'
        this.maxBarStylingText = "Please dont get over 100%! You know how much you can do? regulate your fitnessslider up."
        return "100%"
      } else if (value < 100 && (unitsCount+1)/maxUnitsAmount>1) {
        this.maxBarStylingText = "100%"
        return "100%"
      }else {
        this.maxBarColor = '#1abc9c'
        this.maxBarStylingText = value +"%"
        return value +"%"
      }
    } else{
      console.log(this.model.year,this.model.month,this.model.day)
      return "Please save your profile data or contact the support."
    }
  }
  //TODO: The Date is wrong in the month selection.

  setGoal() {
    if (this.dashboardService.selectedWorkoutsList() == [] && this.dashboardService.selectedProgramsList() == []) {
      return window.alert("please choose workouts and programs first. You can even build up your custom workout. Just add exercises down below Workouts.")
    }
    let goal: GoalAPI;
    let startDate = new Date(this.model.year, this.model.month, this.model.day);

    let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
    goal = {
      //id: this.dashboardService._goalList[this.dashboardService._goalList.length-1].id+1,
      startDate: startDate,
      endDate: endDate,/*
       programs: this.dashboardService.selectedProgramsList(),
       workouts: this.dashboardService.selectedWorkoutsList(),*/
      archived: false,
      user: this.authService.User,
    }
    console.log(goal)

    this.dashboardService.createGoal(goal)
    if (this.router.url == "/dashboard"){
      this.dashboardService.getGoalList()
      this.authService.loadAndCreateUser()
      //function to reload page, so set view changes to detail view
    }



  }


}
