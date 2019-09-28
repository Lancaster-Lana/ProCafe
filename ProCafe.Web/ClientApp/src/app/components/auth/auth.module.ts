import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AuthenticationService } from "./authentication.service";
import { AuthenticationGuard } from "./authentication.guard"; 
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { ProductService } from "../../services/product.service";

@NgModule({
  imports: [BrowserModule, RouterModule, FormsModule, 
  CommonModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [ProductService, AuthenticationService, AuthenticationGuard],
  exports: [
    LoginComponent, RegisterComponent]
})
export class AuthModule { }
