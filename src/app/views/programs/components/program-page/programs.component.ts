import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../../program.service";
import {WorkoutService} from "../../../workouts/workout.service";
import {Program} from "../../../../models/program.model";
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../base/base.component';
import { AuthService } from '../../../../services/auth.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import {Workout} from "../../../../models/workout.model";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent extends BaseComponent implements OnInit {

  //error for future cases array brackets needed in cause of checking the length in get filtered programlist
  private _filteredProgramList: Program[] = [];
  _program : Program = { } as Program;
  private _selectedCategoryId : string = "0";
  closeResult = '';

  public get program() {
    return this._program;
  }

  constructor(public readonly router: Router, public readonly authService: AuthService,
              public programService: ProgramService,
              public workoutService: WorkoutService,
              private modalService : NgbModal)
  {
    super( router, authService);
  }



  /**
   * MODAL VIEW STUFF
   */
  //Adds new program, contributor only
  public open(content: any, id: string) {
    this._program = this.getProgramById(id); // load program data for editing
    //this._program.workouts = this.workoutService._workoutList.map(x => x.name);
    console.log(this._program);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${ProgramsComponent.getDismissReason(reason)}`;
    });
  }

  //track useractions for quitting the modal view
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //Submit for modal view
  onSubmit() {

    if (this._program.id != "") {
      // update
      this.programService.updateProgram(this._program).subscribe((response) => {
          console.log('Program (ID: '+response.id+') updated.');
          this.programList.filter(x => x.id == this._program.id)[0] = this._program; // update program in local list
          this.sortByCategory(this._selectedCategoryId); // refresh sorting
        },
        (error: HttpErrorResponse) => {
          console.log('Exercise could not be updated.', error);
        }
      );


    }
    else {
      // insert
      this.programService.createProgram(this._program).subscribe((response) => {
          console.log('Exercise (ID: '+response.id+') created.');

          this.programList.push(this._program); // add program to local list
          this.sortByCategory(this._selectedCategoryId); // refresh sorting
        },
        (error: HttpErrorResponse) => {
          console.log('Program could not be created.', error);
        }
      );

    }

  }

  /**
   * NORMAL PAGE STUFF
   */
//fire the get request to the server
  ngOnInit(): void {
    this.programService.getProgramList()
    this.workoutService.getWorkoutList()
  }



//function to create the sorted programList
  sortByCategory(event: any) {
    let category = event.target.innerHTML
    if(category == "all") {
      this._filteredProgramList = this.programList
    } else {
      this._filteredProgramList = this.programList.filter(item =>item.category === category)
    }
  }

  //Getter and Setter
  get filteredProgramList():Program[] {
    //needed so there will be content at first loading
    if(this._filteredProgramList.length == 0) {
      this._filteredProgramList = this.programList
    }
    return this._filteredProgramList
  }

  get programList():Program[] {
    return this.programService._programList
  }

  get programCategories(): Set<any> {
    return this.programService.getProgramCategories()
  }

  get Workouts() : Workout[] {
    return this.workoutService._workoutList;
  }

  set Workouts(value: Workout[]) {
    console.log(value);
    //this.workoutService._workoutList.filter(x => x.id == value.id)[0] = value;
  }

  public getProgramById(id: string) : Program {
    let filter = this.programList.filter(item => item.id == id);
    if (filter.length > 0)
      return filter[0];
    else
      return { id:"" } as Program;
  }

}
