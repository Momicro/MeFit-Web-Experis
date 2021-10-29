import {Program} from "./program.model";
import {Workout} from "./workout.model";
import {User} from "./user.model";

export interface Goal {
  id:string;
  startDate:Date;
  endDate:Date;
  archived:boolean;
  programs: Program[];
  workouts: Workout[];
  detail: boolean;
  user: string;
}
export interface GoalAPI {
  //id: string;
  startDate:Date;
  endDate:Date;
  /*programs: Program[];
  workouts: Workout[];*/
  archived:boolean;
  user: User;
}
