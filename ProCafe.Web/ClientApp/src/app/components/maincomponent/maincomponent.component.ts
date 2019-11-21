import { Component  } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../auth/authentication.service';
import { AppTranslationService } from 'src/app/services/app-translation.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: "app-maincomponent",
  templateUrl: "maincomponent.component.html",
  styleUrls: ["maincomponent.component.css"]
})
export class MaincomponentComponent {

  constructor(
    public configurations: ConfigurationService,
    private authService: AuthenticationService,// private accountService: AccountService, private alertService: AlertService,
    private translationService: AppTranslationService) {

  }

  langChange(event: MatSelectChange, lang: string) {
 
  }
}
