import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AgmCoreModule } from '@agm/core'; // A GoogleMaps
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule, MatTabsModule, MatProgressBarModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables'; //JQuery plugin for data filtering, paging
import { AngularFileUploaderModule } from "angular-file-uploader";

//Custom modules
import { RoutingConfig, GoogleMapConfig } from './app-routing.module';
import { AuthModule } from './components/auth/auth.module';
import { AdminModule } from './components/admin/admin.module';
import { StoreModule } from './components/store/store.module';

//Services
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { AuthenticationService } from './components/auth/authentication.service';

//Shared Components
import { AppComponent } from './components/app.component';

//declare module 'googlemaps';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    BrowserModule, RouterModule, AgmCoreModule,
    RoutingConfig, GoogleMapConfig,
    CommonModule, FormsModule, ReactiveFormsModule,
    DataTablesModule, MatAutocompleteModule,
    AngularFileUploaderModule,
    MatDialogModule, MatTabsModule, MatProgressBarModule, MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, BrowserAnimationsModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, LayoutModule, MatToolbarModule, MatSidenavModule, MatListModule, 
    HttpClientModule,
    AuthModule, AdminModule, 
    StoreModule
  ]
  ,exports: [AppComponent] //CommonModule, FormsModule, ReactiveFormsModule,
  ,providers: [ProductService, CartService, OrderService, AuthenticationService]// AdminService,
  ,bootstrap: [AppComponent]
})
export class AppModule { }

