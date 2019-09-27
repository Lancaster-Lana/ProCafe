import { Component, Optional, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Order, CartLine } from "../../../models/order.model";
import { OrderService } from "../../../services/order.service";
import { CartService } from "../../../services/cart.service";

@Component({
    templateUrl: "checkoutDetails.component.html"
})
export class CheckoutDetailsComponent {

  constructor(private router: Router, public cartServ: CartService, public orderServ: OrderService) {
    if (cartServ.selections == null)
      this.router.navigateByUrl("/cart"); //no go to next Payment step
    else //if (this.order != null && this.order.selectedProducts.length == 0)
    {
      //Prepare a new order
      orderServ.order = new Order();
      orderServ.order.selectedProducts = cartServ.selections.map(p => new CartLine(p.productId, p.quantity)); //pass all selected products
    }
  }

  get products(): CartLine[]
  {
    return this.cartServ.selections.map(p => new CartLine(p.productId, p.quantity));
  }
}
