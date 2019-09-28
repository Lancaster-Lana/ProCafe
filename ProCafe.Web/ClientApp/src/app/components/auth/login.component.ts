import { Component } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Component({
  templateUrl: "login.component.html",
  styleUrls : ["login.component.css"]
})
export class LoginComponent {

  showError: boolean = false;

  constructor(public authService: AuthenticationService) { }

  login() {
    this.showError = false;
    this.authService.login()
      .subscribe(result =>
      {
        console.log(result);
        this.showError = !result;
      });
  }
}
