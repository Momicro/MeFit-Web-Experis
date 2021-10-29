import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {DashboardService} from "../../dashboard.service";

@Component({
  selector: 'selection-window',
  templateUrl: './selection-window.component.html',
  styleUrls: ['./selection-window.component.css']
})
export class SelectionWindowComponent implements OnInit,OnDestroy{

  //If for some reason the window gets closed or reloaded, those functions will be fired anyway.
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event:any) {
    this.dashboardService.saveLocal()
  }

  constructor(public readonly dashboardService: DashboardService) { }

  ngOnInit(): void{

  }

  ngOnDestroy(): void{
    this.dashboardService.saveLocal()
  }

}
