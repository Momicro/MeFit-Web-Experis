import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {Workout} from "../../../../models/workout.model";
import {WorkoutService} from "../../workout.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent extends BaseComponent implements OnInit {
  private _filteredWorkoutList: Workout[] = [];
  private _workout : Workout = { } as Workout;
  closeResult = '';

  constructor(public readonly router: Router, public readonly authService: AuthService,
    public workoutService: WorkoutService, private modalService : NgbModal)
  {
    super(router, authService);
  }

  public get workout() {
    return this._workout;
  }

  ngOnInit(): void {
    this.workoutService.getWorkoutList()
  }

  /**
   * MODAL VIEW STUFF
   */


  //filter the workouts by type
  sortByType(event: any) {
    let type = event.target.innerHTML
    if(type == "all"){
      this._filteredWorkoutList = this.workoutList
    }else {
      this._filteredWorkoutList = this.workoutList.filter(item => item.type === type)
    }
  }

  //GETTER

  get filteredWorkoutList(): Workout[]{
    if(this._filteredWorkoutList.length == 0) {
      this._filteredWorkoutList = this.workoutList
    }
    return this._filteredWorkoutList
  }

  get workoutList():Workout[] {
    console.log(this.workoutService._workoutList)
    return this.workoutService._workoutList
  }

  get workoutTypes(): Set<any> {
    console.log(this.workoutService.getWorkoutTypes());
    return this.workoutService.getWorkoutTypes()
  }

  /**
   * MODAL VIEW STUFF
   */
  //Adds new workout, contributor only
  public open(content: any, id: string) {
    this._workout = this.getWorkoutById(id); // load workout data for editing
    console.log(this._workout);
    //this._workout.muscleGroup = this.extractId(this._workout.muscleGroup);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${WorkoutsComponent.getDismissReason(reason)}`;
    });
  }


  //track the users actions to quit the modal view
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public getWorkoutById(id: string) : Workout {
    let filter = this.workoutList.filter(item => item.id == id);
    if (filter.length > 0)
      return filter[0];
    else
      return { id:"" } as Workout;
  }

  //Submit for modal view
  onSubmit() {

    if (this._workout.id != "") {
      // update
      this.workoutService.updateWorkout(this._workout).subscribe((response) => {
          console.log('Workout (ID: '+response.id+') updated.');
          this.workoutList.filter(x => x.id == this._workout.id)[0] = this._workout; // update workout in local list
          //this.sortByMusclegroup(this._selectedMuscleGroupId); // refresh sorting
        },
        (error: HttpErrorResponse) => {
          console.log('Workout could not be updated.', error);
        }
      );


    }
    else {
      // insert
      this.workoutService.createWorkout(this._workout).subscribe((response) => {
          console.log('Workout (ID: '+response.id+') created.');

          this.workoutList.push(this._workout); // add workout to local list
          //this.sortByMusclegroup(this._selectedMuscleGroupId); // refresh sorting
        },
        (error: HttpErrorResponse) => {
          console.log('Workout could not be created.', error);
        }
      );

    }

  }
}
