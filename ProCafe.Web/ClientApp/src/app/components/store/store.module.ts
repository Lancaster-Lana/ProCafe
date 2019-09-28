import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material';

import { MaincomponentComponent } from "../maincomponent/maincomponent.component";
import { AddressComponent } from "../address/address.component";
import { CategoryFilterComponent } from "./product/categoryFilter.component";
import { ProductsListComponent } from './product/productsList.component';
import { RatingsComponent } from "./product/ratings.component";

import { CartDetailComponent } from "./cartDetail.component";
import { CartSummaryComponent } from "./cartSummary.component";
import { PaginationComponent } from "./pagination.component";

import { CheckoutDetailsComponent } from "./checkout/checkoutDetails.component";
import { CheckoutPaymentComponent } from "./checkout/checkoutPayment.component";
import { CheckoutSummaryComponent } from "./checkout/checkoutSummary.component";
import { OrderConfirmationComponent } from "./checkout/orderConfirmation.component";

@NgModule({
  declarations: [
    MaincomponentComponent,
    AddressComponent,
    CategoryFilterComponent, 
    ProductsListComponent,  RatingsComponent, PaginationComponent,
    CartSummaryComponent, CartDetailComponent, 
    CheckoutDetailsComponent,
    CheckoutPaymentComponent, CheckoutSummaryComponent,
    OrderConfirmationComponent],
  imports: [BrowserModule, RouterModule, FormsModule,
    MatAutocompleteModule, MatFormFieldModule, MatInputModule //just materialize components
  ],

  //Shared components that can be used in other cimponents of OTHER modules
  exports: [MaincomponentComponent,
    AddressComponent, ProductsListComponent, PaginationComponent, RatingsComponent,
    CartDetailComponent, CartSummaryComponent]
})
export class StoreModule { }
