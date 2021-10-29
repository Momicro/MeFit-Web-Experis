import {Component, Input, OnInit} from '@angular/core';
import {Program} from "../../../../models/program.model";
import {ProgramService} from "../../program.service";

@Component({
  selector: 'program-detail',
  templateUrl: './program-detail-view.component.html',
  styleUrls: ['./program-detail-view.component.css']
})
export class ProgramDetailViewComponent implements OnInit {

  @Input() program!: Program;

  constructor(readonly programService: ProgramService) { }


  ngOnInit(): void {
  }

}
