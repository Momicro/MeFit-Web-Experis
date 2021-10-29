import {Musclegroup} from "./musclegroup.model";
import {Workout} from "./workout.model";

export interface Exercise {
  id: string;
	name: string;
	description: string;
	muscleGroup: string;
	workouts: string;
	detail: boolean;
}
