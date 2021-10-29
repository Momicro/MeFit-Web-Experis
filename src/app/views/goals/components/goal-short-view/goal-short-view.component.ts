import {Component, Input, OnInit} from '@angular/core';
import {Goal} from "../../../../models/goal.model";
import {Router} from "@angular/router";
import {DashboardService} from "../../../../dashboard/dashboard.service";

@Component({
  selector: 'goal-short',
  templateUrl: './goal-short-view.component.html',
  styleUrls: ['./goal-short-view.component.css']
})
export class GoalShortViewComponent implements OnInit {

  @Input() goal!: Goal;

  constructor(private readonly router: Router,
              readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
  }


  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  reloadContent() {
    this.refreshComponent()
  }
}
