import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Musclegroup} from "../models/musclegroup.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { environment as ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MuscleGroupService {
  public _musclegroupList: Musclegroup[] = [];
  private _error!: string;

  private apiBaseUrl : string = `${ENV.apiBaseUrl}/api/v1/muscleGroups`;

  constructor(private readonly http: HttpClient) { }

  private fetchMusclegroupList: Observable<Musclegroup[]> =
    this.http.get<Musclegroup[]>(this.apiBaseUrl)


  //subscriber for the musclegrouplist observable
  getMusclegroupsList():void {
    this.fetchMusclegroupList
      .subscribe((musclegroupList: Musclegroup[]) => {this._musclegroupList = musclegroupList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }
  MusclegroupById(id:string): Musclegroup {
    return this._musclegroupList.filter(item => item.id == id)[0]
  };

}
