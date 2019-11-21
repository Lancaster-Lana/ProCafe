import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';

import { MaincomponentComponent } from './components/maincomponent/maincomponent.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { AuthenticationGuard } from './components/auth/authentication.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ProductAdminComponent } from './components/admin/productAdmin.component';
import { OverviewComponent } from './components/admin/overview.component';
import { OrderAdminComponent } from './components/admin/orderAdmin.component';
import { CheckoutDetailsComponent } from './components/store/checkout/checkoutDetails.component';
import { OrderConfirmationComponent } from './components/store/checkout/orderConfirmation.component';
import { CheckoutPaymentComponent } from './components/store/checkout/checkoutPayment.component';
import { CheckoutSummaryComponent } from './components/store/checkout/checkoutSummary.component';
import { CartDetailComponent } from './components/store/cartDetail.component';
import { ProductDetailsComponent } from './components/admin/productDetailsComponent.component';
import { ProductEditorComponent } from './components/admin/productEditor.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin", redirectTo: "/admin/overview", pathMatch: "full" },
  {
    path: "admin", component: AdminComponent, 
    canActivateChild: [AuthenticationGuard],
    children: [  
      { path: "products", component: ProductAdminComponent },
      { path: "productDetails/:id", component: ProductDetailsComponent },
      { path: "productCreate", component: ProductEditorComponent },
      { path: "productEdit/:id", component: ProductEditorComponent  },
      { path: "orders", component: OrderAdminComponent },
      { path: "overview", component: OverviewComponent },
      { path: "", component: OverviewComponent }  
    ]
  },
  { path: "checkout/step1", component: CheckoutDetailsComponent },
  { path: "checkout/step2", component: CheckoutPaymentComponent },
  { path: "checkout/step3", component: CheckoutSummaryComponent },
  { path: "checkout/confirmation", component: OrderConfirmationComponent },
  { path: "checkout", component: CheckoutDetailsComponent },
  { path: "cart", component: CartDetailComponent },
  { path: "", component: MaincomponentComponent, pathMatch: "full" }
];

export const RoutingConfig = RouterModule.forRoot(routes);

export const GoogleMapConfig =
  AgmCoreModule.forRoot({
    apiKey: "AIzaSyCcnYCjBaJMXl55oYqiNPTpNxFdk_aKGTM",
    libraries: ["places"]
  });
