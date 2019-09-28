//import { CartService } from "../services/cart.service";

export class ProductSelection
{
  constructor(
    //private cart: CartService,
    public productId?: number,
    public name?: string,
    public price?: number,
    private quantityValue?: number) { }

  get quantity() {
    return this.quantityValue;
  }

  set quantity(newQuantity: number) {
    this.quantityValue = newQuantity;
    //this.cart.update();
  }
}
