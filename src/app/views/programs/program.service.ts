import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {Program} from "../../models/program.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Workout} from "../../models/workout.model";
import {WorkoutService} from "../workouts/workout.service";
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  //seeding sample Data further there is the need of receiving the data of the API.
  public _programList: Program[] = [];
  private _error!: string;
  private _programCategories = new Set();

  private apiBaseUrl : string = `${ENV.apiBaseUrl}/api/v1/programs`;

  constructor(private readonly http: HttpClient,
              private readonly workoutService: WorkoutService) { }

  private fetchProgramList: Observable<Program[]> =
    this.http.get<Program[]>(this.apiBaseUrl)


  //subscriber for the programlist observable
  getProgramList():void {
    this.fetchProgramList
      .subscribe((programList: Program[]) => {this._programList = programList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  //getter for the categories existing
  getProgramCategories():Set<any> {
    for (let i of this._programList) {
      this._programCategories.add(i.category)
    }
    return this._programCategories;
  }

//get all workouts of a specific Program
  Workouts(program: Program) {
    let programWorkouts: Workout[] = [];
    for (let i of program.workouts){
      let j= i.split("/");
      i = i.split("/")[j.length - 1];
      programWorkouts.push(this.workoutService._workoutList.filter(item =>item.id == i)[0])
        }
    return programWorkouts
  }


  //prepare the Object for the API
  private static getDTO(input: Program) : Program {

    let output = JSON.parse(JSON.stringify(input));
    output.workout = { id: input.workouts };

    return output;
  }

  createProgram(program: Program) : Observable<Program>
  {
    return this.http.post<Program>(this.apiBaseUrl, ProgramService.getDTO(program), ENV.httpOptions)
  }

  updateProgram(program: Program) : Observable<Program>
  {
    return this.http.put<Program>(this.apiBaseUrl+`/${program.id}`, ProgramService.getDTO(program), ENV.httpOptions);
  }
}
