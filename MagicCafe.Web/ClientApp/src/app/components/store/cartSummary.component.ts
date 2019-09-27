import { Component } from "@angular/core";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "cart-summary",
  templateUrl: "cartSummary.component.html"
})
export class CartSummaryComponent {

  constructor(private cart: CartService) { }

  get itemCount(): number {
    return this.cart.itemCount;
  }

  get totalPrice(): number {
    return this.cart.totalPrice;
  }
}
