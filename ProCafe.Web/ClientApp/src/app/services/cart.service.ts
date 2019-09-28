import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductSelection } from "../models/productselection.model";
import { AuthenticationService } from "../components/auth/authentication.service";

@Injectable({ providedIn: 'root' })
export class CartService {
  selections: ProductSelection[] = [];
  itemCount: number = 0;
  totalPrice: number = 0;

  constructor(private serv: AuthenticationService) {
    serv.getSessionData("cart").subscribe(cartData => {
      if (cartData != null) {
        cartData.map(item => new ProductSelection(item.productId, item.name, item.price, item.quantity))
          .forEach(item => this.selections.push(item));
        this.update(false);
      }
    });
  }

  addProduct(product: Product) {
    let selection = this.selections.find(ps => ps.productId == product.productId);
    if (selection) {
      selection.quantity++;
    }
    else {
      this.selections.push(new ProductSelection(product.productId, product.name, product.price, 1));
    }
    this.update();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      let selection = this.selections.find(ps => ps.productId == productId);
      if (selection) {
        selection.quantity = quantity;
      }
    } else {
      let index = this.selections.findIndex(ps => ps.productId == productId);
      if (index != -1) {
        this.selections.splice(index, 1);
      }
      this.update();
    }
  }

  clear() {
    this.selections = [];
    this.update();
  }

  update(storeData: boolean = true) {
    this.itemCount = this.selections.map(ps => ps.quantity)
      .reduce((prev, curr) => prev + curr, 0);
    this.totalPrice = this.selections.map(ps => ps.price * ps.quantity).reduce((prev, curr) => prev + curr, 0);
    if (storeData) {
      this.serv.storeSessionData("cart", this.selections.map(s => {
        return {
          productId: s.productId, name: s.name,
          price: s.price, quantity: s.quantity
        }
      }));
    }
  }
}
