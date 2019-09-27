import { Component, Host } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { OrderService } from "../../../services/order.service";

//var card = require("card");

@Component({
  templateUrl: "checkoutPayment.component.html"
})
export class CheckoutPaymentComponent {

  constructor( public orderServ: OrderService, private router: Router) {

    if (orderServ.order == null || orderServ.order.name == null || orderServ.order.address == null)
    {
      router.navigateByUrl("checkout/step1");
    }
  }
}
