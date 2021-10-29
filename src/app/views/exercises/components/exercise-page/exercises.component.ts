import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../base/base.component';
import { AuthService } from '../../../../services/auth.service';
import { ExerciseService } from '../../exercise.service';
import {Exercise} from "../../../../models/exercise.model";
import {Musclegroup} from "../../../../models/musclegroup.model";
import {MuscleGroupService} from "../../../../services/muscle-group.service";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent extends BaseComponent implements OnInit {
  private _filteredExerciseList: Exercise[] = [];
  private _exercise : Exercise = { } as Exercise;
  private _selectedMuscleGroupId : string = "0";
  closeResult = '';

  public get exercise() {
    return this._exercise;
  }

  constructor(public readonly router: Router, public readonly authService: AuthService,
              private readonly exerciseService: ExerciseService,
              private readonly musclegroupService: MuscleGroupService,
              private modalService : NgbModal) {
    super(router, authService);
  }

  private extractId(url: string) : string {
    if (url != null) {
      let pos = url.lastIndexOf("/");
      if (pos > 0)
        return url.substr(pos+1);
    }
    return "";
  }

  /**
   * MODAL VIEW STUFF
   */
  //Adds new exercise, contributor only
  public open(content: any, id: string) {
    this._exercise = this.getExerciseById(id); // load exercise data for editing
    console.log(this._exercise);
    this._exercise.muscleGroup = this.extractId(this._exercise.muscleGroup);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //For reload after using modal view
  private reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //Submit for modal view
  onSubmit() {

    if (this._exercise.id != "") {
      // update
      this.exerciseService.updateExercise(this._exercise).subscribe((response) => {
          console.log('Exercise (ID: '+response.id+') updated.');
          this.exerciseList.filter(x => x.id == this._exercise.id)[0] = this._exercise; // update exercise in local list
          this.sortByMusclegroup(this._selectedMuscleGroupId); // refresh sorting
        },
        (error: HttpErrorResponse) => {
          console.log('Exercise could not be updated.', error);
        }
      );


    }
    else {
      // insert
      this.exerciseService.createExercise(this._exercise).subscribe((response) => {
          console.log('Exercise (ID: '+response.id+') created.');

          this.exerciseList.push(this._exercise); // add exercise to local list
          this.sortByMusclegroup(this._selectedMuscleGroupId); // refresh sorting
        },
        (error: HttpErrorResponse) => {
          console.log('Exercise could not be created.', error);
        }
      );

    }

  }

  /**
   * NORMAL PAGE STUFF
   */


  ngOnInit(): void {
    this.exerciseService.getExerciseList();
  }

  //TODO function to create the sorted exerciseList
  public sortByMusclegroupClick(event: any) {
    let musclegroupId;
    if (event.target.innerHTML == "all") {
      musclegroupId = "0"}
    else {
      musclegroupId = this.musclegroupService._musclegroupList.filter(item => (item.name == event.target.innerHTML))[0].id;
    }
    this._selectedMuscleGroupId = musclegroupId;
    this.sortByMusclegroup(musclegroupId);
  }

  sortByMusclegroup(musclegroupId: string) {
    if(musclegroupId == "0") {
      this._filteredExerciseList = this.exerciseList
    } else {
      this._filteredExerciseList = this.exerciseList.filter(item =>
        (item.muscleGroup != null) ? item.muscleGroup.endsWith("/"+musclegroupId) : 0
      )
    }
  }

  //Getter and Setter
  get filteredExerciseList():Exercise[] {
    //needed so there will be content at first loading
    if(this._filteredExerciseList.length == 0) {
      this._filteredExerciseList = this.exerciseList
    }
    return this._filteredExerciseList
  }

  public getExerciseById(id: string) : Exercise {
    let filter = this.exerciseList.filter(item => item.id == id);
    if (filter.length > 0)
      return filter[0];
    else
      return { id:"" } as Exercise;
  }

  get exerciseList():Exercise[] {
    return this.exerciseService._exerciseList.sort((a, b) => a.name > b.name && 1 || -1);
  }

  get exerciseMusclegroup(): Musclegroup[] {
    return this.exerciseService.getExerciseMusclegroups()
  }

  set Exercise(value: Exercise) {
    this._exercise = value;
  }

}
