import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AgmCoreModule, AgmCircle, AgmMarker, AgmInfoWindow, AgmMap } from "@agm/core";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AdminComponent } from "./admin.component";
import { TranslateModule } from '@ngx-translate/core';
import { OverviewComponent } from "./overview.component";
import { ProductAdminComponent } from "./productAdmin.component";
import { OrderAdminComponent } from "./orderAdmin.component";
import { ProductEditorComponent } from "./productEditor.component";
import { ProductDetailsComponent } from "./productDetailsComponent.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [AdminComponent,
    OverviewComponent,
    ProductAdminComponent, ProductEditorComponent, ProductDetailsComponent,
    OrderAdminComponent],
  imports: [
    RouterModule,
    AgmCoreModule, //AgmCircle, AgmMarker, AgmInfoWindow, AgmMap,
    GooglePlaceModule,
    TranslateModule,
    BrowserModule, FormsModule, DataTablesModule, AgmCoreModule],

  exports: [AdminComponent, AgmCoreModule]
})
export class AdminModule { }
