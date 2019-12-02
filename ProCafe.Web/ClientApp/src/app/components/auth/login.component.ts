import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { AlertService, MessageSeverity } from "src/app/services/alert.service";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent {

  showError: boolean = false;

  constructor(
    public authService: AuthenticationService,
    private alertService: AlertService, 
    private router: Router) { }

  login() {
    this.showError = false;
    this.authService.login().subscribe(
      (result: any) => {
        if (result && result.ok)
          this.router.navigate(['/login']);  //this.alertService.success('Registration successful', true);
        else {
          console.error("Error login");
          //display validation errors
          this.showError = true;//!result;
          //this.errors = result;//.json();
          this.alertService.showStickyMessage("Error login", result, MessageSeverity.error);
        }
      },
      error => {
        console.error("Error login :" + error);
        // error from server //this.alertService.error(error);
        this.showError = true;
        //this.loading = false;
        this.alertService.showStickyMessage("Error login", error, MessageSeverity.error);
      });
  }
}
