import {Injectable} from '@angular/core';
import {Workout} from "../../models/workout.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../../models/exercise.model";
import {ExerciseService} from "../exercises/exercise.service";
import {environment as ENV} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  //seeding sample Data further there is the need of receiving the data of the API.
  public _workoutList: Workout[] =[];
  private _error!: string;
  private _workoutTypes = new Set();

  private apiBaseUrl : string = `${ENV.apiBaseUrl}/api/v1/workouts`;


  constructor(private readonly http: HttpClient,
              readonly exerciseService: ExerciseService) { }


  private fetchWorkoutList: Observable<Workout[]> =
    this.http.get<Workout[]>(this.apiBaseUrl)


  //subscriber for the workoutlist observable
  getWorkoutList():void {
    this.fetchWorkoutList
      .subscribe((workoutList: Workout[]) => {this._workoutList = workoutList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getWorkoutTypes():Set<any> {
    for (let i of this._workoutList) {
      this._workoutTypes.add(i.type)
    }
    return this._workoutTypes;
  }

  //get all exercises of a specific workout
  Exercises(workout: Workout) {
    let workoutExercises: Exercise[] = [];
    for (let i of workout.exercises){
      let j= i.split("/");
      i = i.split("/")[j.length - 1];
      workoutExercises.push(this.exerciseService._exerciseList.filter(item =>item.id == i)[0])
    }
    return workoutExercises
  }

  //DTO creator to format the data for the API
  private static getDTO(input: Workout) : Workout {

    //output.muscleGroup = { id: input.muscleGroup };
    //delete output.workouts;

    return JSON.parse(JSON.stringify(input));
  }

  createWorkout(workout: Workout) : Observable<Workout>
  {
    return this.http.post<Workout>(this.apiBaseUrl, WorkoutService.getDTO(workout), ENV.httpOptions)
  }

  updateWorkout(workout: Workout) : Observable<Workout>
  {
    return this.http.put<Workout>(this.apiBaseUrl+`/${workout.id}`, WorkoutService.getDTO(workout), ENV.httpOptions);
  }

}
