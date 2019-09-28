import { Component } from "@angular/core";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "cart-details",
  templateUrl: "cartDetail.component.html"
})
export class CartDetailComponent {

  constructor(public cart: CartService) { }
}
