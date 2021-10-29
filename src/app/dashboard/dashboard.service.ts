import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Goal, GoalAPI} from "../models/goal.model";
import {Workout} from "../models/workout.model";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Program} from "../models/program.model";
import {Exercise} from "../models/exercise.model";
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService{

  private _selectedProgramsList: Program[] = [];
  private _selectedWorkoutsList: Workout[] = [];
  private _selectedExercisesList: Exercise[] = [];
  public _goalList: Goal[] = [];
  private _error!: string;
  _currentGoal!: Goal;
  _goal!: Goal;
  _goalWorkoutList: Workout[] = [];
  _completedGoalWorkoutList: Workout[] = [];

  constructor(private readonly http: HttpClient, private readonly router: Router,
              public readonly authService: AuthService,) { }



  /**
   * Calendar
   */

  public get currentDate() : Date {
    let d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  //Function to get the last 6 days the current day and the next 7 days in an Array
  public getCalendarDateArray() {
    let calendarArray=[];

    let now = new Date();

    for (let i = -6; i<=7; i++)
    {
      let d = new Date(now.getFullYear(), now.getMonth()+1, now.getDate() + i);
      calendarArray.push(d);
    }

    return calendarArray;
  }

  dateComparator(endDate: Date, startDate: Date ):boolean {
    let today = new Date;
    return (new Date(endDate)> today && new Date(startDate)<today)
  }

  /**
   * Goalservice
   */

//Create new Goal
  createGoal(goal:GoalAPI){
    let goalID: string;
    this.http.post<Goal>(ENV.apiBaseUrl+"/api/v1/goals", goal, ENV.httpOptions)
      .subscribe((response) => {
        goalID = response.id
        console.log('Goal (ID: '+response.id+') created.')
      }, (error: HttpErrorResponse) => {
        console.log('Goal could not be created', error);
      },() => {
        this.updateGoalWorkouts(this._selectedWorkoutsList,this._selectedProgramsList,goalID)
        localStorage.removeItem('selectedProgramsList');
        localStorage.removeItem('selectedWorkoutsList');

        this.clearSelectedProgramsList();
        this.clearSelectedWorkoutsList();
        }
      )
  }

  //update GoalWorkoutList
  updateGoalWorkouts(workouts: Workout[], programs: Program[], goalID: string){
    for(let workout of workouts){
      console.log(workouts)
      this.http.put(ENV.apiBaseUrl+"/api/v1/goals/"+goalID+"/workouts/"+workout.id,null)
        .subscribe(data => console.log(data))
      console.log(ENV.apiBaseUrl+"/api/v1/goals/"+goalID+"/workouts/"+workout.id)
    }
    console.log(programs)
    for(let program of programs){
      this.http.put(ENV.apiBaseUrl+"/api/v1/goals/"+goalID+"/programs/"+program.id,null)
        .subscribe(data => console.log(data))
      console.log(ENV.apiBaseUrl+"/api/v1/goals/"+goalID+"/programs/"+program.id)
    }
  }

//Get all pending or failed Workouts of a specific Goal
  getGoalWorkoutList(goal: Goal):void {
    let rootURL = ENV.apiBaseUrl+"/api/v1/goals/" + goal.id +"/workouts"
    this.http.get<Workout[]>(rootURL)
      .subscribe((goalWorkoutList: Workout[]) => {for (let workout of goalWorkoutList){workout.completed=false} this._goalWorkoutList = goalWorkoutList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }
//Get all completed Workouts of a specific goal
  getCompletedGoalWorkoutList(goal:Goal): void {
    let rootURL = ENV.apiBaseUrl+"/api/v1/goals/" + goal.id +"/workouts/completed"
    this.http.get<Workout[]>(rootURL)
      .subscribe((goalWorkoutList: Workout[]) => {for (let workout of goalWorkoutList){workout.completed=true} this._completedGoalWorkoutList = goalWorkoutList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  private fetchGoalList: Observable<Goal[]> =
    this.http.get<Goal[]>(ENV.apiBaseUrl+"/api/v1/goals")

  //TODO: Make it return only the goals of the loggedIn user
  getGoalList():void {
    this.fetchGoalList
      .subscribe((goalList: Goal[]) => {this._goalList = goalList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getGoalById(id:string):void {
    this.http.get<Goal>(ENV.apiBaseUrl+"/api/v1/goals/" + id)
      .subscribe((goal: Goal) => {this._goal = goal},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }


  //function to return true if you are in the goal set up menu.
  //TODO: build in the check for no existing goals
  setGoalCheck(): boolean {
    if(this.router.url == "/goals/set"){
      return false
    } else if (this.router.url == "/dashboard" && this.authService.User.activeGoal== undefined){
      return false
    }
    return true
  }

  addBtn() {
    return {
      hide: this.setGoalCheck()
    }
  }

  //Goal Setup functions

  selectedProgramsList(): Program[] {
    return this._selectedProgramsList
  }

  selectedWorkoutsList(): Workout[] {
    return this._selectedWorkoutsList
  }


  selectProgram(program: Program) {
    this._selectedProgramsList.push(program)
  }

  selectWorkout(workout: Workout) {
    this._selectedWorkoutsList.push(workout)
  }

  selectExercise(exercise: Exercise):void {
    this._selectedExercisesList.push(exercise)
  }
//checks the localStorage and reads the data if possible
  checkLocalStorage():void {
    let selectedWorkouts = JSON.parse(<string>localStorage.getItem('selectedWorkoutsList'))
    let selectedPrograms = JSON.parse(<string>localStorage.getItem('selectedProgramsList'))

    if(selectedPrograms != null) {
      this._selectedProgramsList = selectedPrograms
    }
    if (selectedWorkouts != null){
      this._selectedWorkoutsList = selectedWorkouts
    }
  }

  saveLocal() {
    localStorage.setItem('selectedWorkoutsList',JSON.stringify(this._selectedWorkoutsList))
    localStorage.setItem('selectedProgramsList',JSON.stringify(this._selectedProgramsList))
    localStorage.setItem('selectedExercisesList',JSON.stringify(this._selectedExercisesList))
    console.log("saved to local storage")
  }

  clearSelection() {
    localStorage.removeItem('selectedWorkoutsList')
    localStorage.removeItem('selectedProgramsList')
    this._selectedWorkoutsList = []
    this._selectedProgramsList = []
  }

  deleteSelectedProgram(item: Program):void {
    this._selectedProgramsList = this._selectedProgramsList.filter(element => element!==item)
  }

  deleteSelectedWorkout(item: Workout):void {
    this._selectedWorkoutsList = this._selectedWorkoutsList.filter(element => element!==item)
  }

  completeWorkout(workout: Workout):void {
    workout.completed=true;
    let goal = this.authService.User.activeGoal
    this.http.put<Workout>(ENV.apiBaseUrl + '/api/v1/goals/' + goal.id + '/workouts/' + workout.id + "/completed",null,ENV.httpOptions)
      .subscribe((response) => console.log(response))
    this.getGoalWorkoutList(goal);
    this.getCompletedGoalWorkoutList(goal)
  }


  clearSelectedProgramsList() {
    this._selectedProgramsList = [];
  }

  clearSelectedWorkoutsList() {
    this._selectedWorkoutsList = [];
  }
}

