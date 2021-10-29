import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Exercise } from "../../models/exercise.model";
import {Observable} from "rxjs";
import {Musclegroup} from "../../models/musclegroup.model";
import {MuscleGroupService} from "../../services/muscle-group.service";
import {environment as ENV} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    public _exerciseList: Exercise[] = [];
    private _error: string = '';

    private apiBaseUrl : string = `${ENV.apiBaseUrl}/api/v1/exercises`;

    constructor(private readonly http: HttpClient,
                readonly musclegroupService: MuscleGroupService)
    {
    }

    public error(): string {
        return this._error;
    }

  private fetchExerciseList: Observable<Exercise[]> =
    this.http.get<Exercise[]>(this.apiBaseUrl)


  //subscriber for the exerciselist observable
  getExerciseList():void {
    this.fetchExerciseList
      .subscribe((exerciseList: Exercise[]) => {this._exerciseList = exerciseList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getExerciseMusclegroups():Musclegroup[] {
      return this.musclegroupService._musclegroupList
  }

  //get the musclegroup of a specific exercise
  Musclegroups(exercise: Exercise) {
    let i: string[] = exercise.muscleGroup.split("/");
    let j: string = i[i.length - 1]
    return this.musclegroupService._musclegroupList.filter(item => item.id == j)[0]
  }

  //prepare Object for passing to the API
  private static getDTO(input: Exercise) : Exercise {

    let output = JSON.parse(JSON.stringify(input));
    output.muscleGroup = { id: input.muscleGroup };
    delete output.workouts;

    return output;
  }

  createExercise(exercise: Exercise) : Observable<Exercise>
  {
    return this.http.post<Exercise>(this.apiBaseUrl, ExerciseService.getDTO(exercise), ENV.httpOptions)
  }

  updateExercise(exercise: Exercise) : Observable<Exercise>
  {
    return this.http.put<Exercise>(this.apiBaseUrl+`/${exercise.id}`, ExerciseService.getDTO(exercise), ENV.httpOptions);
  }
}
