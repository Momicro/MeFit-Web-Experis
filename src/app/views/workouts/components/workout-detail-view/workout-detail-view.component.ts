import {Component, Input, OnInit} from '@angular/core';
import {Workout} from "../../../../models/workout.model";
import {WorkoutService} from "../../workout.service";
import {ExerciseService} from "../../../exercises/exercise.service";

@Component({
  selector: 'workout-detail',
  templateUrl: './workout-detail-view.component.html',
  styleUrls: ['./workout-detail-view.component.css']
})
export class WorkoutDetailViewComponent implements OnInit {

  @Input() workout!: Workout;

  constructor(readonly workoutService: WorkoutService) { }

  ngOnInit(): void {
  }



}
