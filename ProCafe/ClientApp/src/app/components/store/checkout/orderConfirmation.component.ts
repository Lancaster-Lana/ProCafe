import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OrderService } from "../../../services/order.service";
import { CartService } from "../../../services/cart.service";

@Component({
  templateUrl: "orderConfirmation.component.html"
})
export class OrderConfirmationComponent
{
  constructor(private router: Router, public orderServ: OrderService, public cartService: CartService)
  {
    if (orderServ.order != null) {
      if (!orderServ.order.submitted) {
        //go beack to fill all data
        router.navigateByUrl("/checkout/step3");
      }
      else
      {
        //clear the order information (to prepare for creating a new one)
        orderServ.order.clear();
        //Clear shopping bag (to clear previous ordered products)
        cartService.clear();
      }
    }
  }
}
