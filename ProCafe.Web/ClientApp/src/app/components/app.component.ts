/// <reference types="@types/googlemaps" />
import { Component, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorHandlerService } from '../errorHandler.service';
declare let google: any;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  providers: []
})
export class AppComponent {
  //private lastError: string[];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  //constructor(errorHandler: ErrorHandlerService, ngZone: NgZone) {
  //  errorHandler.errors.subscribe(error => {
  //    ngZone.run(() => this.lastError = error);
  //  });
  //}

  //get error(): string[] {
  //  return this.lastError;
  //}

  //clearError() {
  //  this.lastError = null;
  //}
}
