import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ValidationError } from "../../../errorHandler.service";
import { Order, CartLine } from "../../../models/order.model";
import { OrderService } from "../../../services/order.service";
import { CartService } from "../../../services/cart.service";
import swal from "sweetalert2";

@Component({
  templateUrl: "checkoutSummary.component.html"
})
export class CheckoutSummaryComponent {

  order: Order;
  errorMessage: string = null;

  constructor(public cartServ: CartService, public orderServ: OrderService, private router: Router) {
    if (orderServ.order.payment.cardNumber == null
      || orderServ.order.payment.cardExpiry == null
      || orderServ.order.payment.cardSecurityCode == null) {
      router.navigateByUrl("/checkout/step2"); //previous step
    }
    else {
      orderServ.order.selectedProducts = cartServ.selections.map(p => new CartLine(p.productId, p.quantity));
      this.order = orderServ.order;
    }
  }

  public submitOrder()
  {
    //refresh invoice price
    this.orderServ.order.payment.total = this.cartServ.totalPrice;

    this.orderServ.createOrder()
      .add(finishAct => {
        this.errorMessage = this.orderServ.errorMsg;

        if (this.errorMessage) {
          console.error(this.errorMessage); // and show on

          //Notification success alert
          swal.fire({
            type: 'error',
            text: this.errorMessage,
            confirmButtonText: 'OK',
            position: 'center'
          }).then(res => { });
        }
        else {
          //this.orderServ.order.orderConfirmation = data
          this.orderServ.order.submitted = true;

            //If order created successfully - go to confirm 
            this.router.navigateByUrl("/checkout/confirmation");

            //Notify parent component (refresh, change its view mode, etc.)
            //this.orderCreated.emit(true);
         
        }
      });
         /*,catchError((errorResponse: Response) => {
        if (errorResponse.status == 400) {
          let jsonData;
          try {
            jsonData = errorResponse.json();
            alert(jsonData);
            //this.errorMessage = jsonData;
            //console.error(errorResponse.body || errorResponse);
            //let errMessages = Object.getOwnPropertyNames(jsonData).map(p => jsonData[p]);
            //console.error(errMessages);

            //throw new ValidationError(messages);
            return jsonData;
          }
          catch (e) {
            throw new Error("Network Error");
          }
        }
       })
      */
  }
}
