import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends BaseComponent implements OnInit {
  title = 'MeFit';

  public hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }
//defines the routing actions ---> user will mostly be redirected to the dashboard
  public routeDashboard():void {
    let currentUrl = this.router.url;
    if (this.router.url == "/dashboard") {
      this.router.routeReuseStrategy.shouldReuseRoute = () => true;
      this.router.onSameUrlNavigation = 'reload';
      window.location.reload();
      this.router.navigate([currentUrl]);
        console.log("refreshed the page");
    } else {
      this.router.navigate(["/dashboard"]);
    }
  }

  constructor(public router: Router, public authService: AuthService) {
    super(router, authService);
  }

  ngOnInit(): void {
  }

}
