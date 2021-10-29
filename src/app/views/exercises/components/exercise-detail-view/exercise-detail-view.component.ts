import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../../../models/exercise.model";
import {Musclegroup} from "../../../../models/musclegroup.model";
import {MuscleGroupService} from "../../../../services/muscle-group.service";
import {ExerciseService} from "../../exercise.service";

@Component({
  selector: 'exercise-detail',
  templateUrl: './exercise-detail-view.component.html',
  styleUrls: ['./exercise-detail-view.component.css']
})
export class ExerciseDetailViewComponent implements OnInit {

  @Input() exercise!: Exercise;

  constructor(readonly exerciseService: ExerciseService) { }

  ngOnInit(): void {
  }

}
