import { Component } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { ProductService } from "../../services/product.service";

@Component({
  templateUrl: "overview.component.html"
})
export class OverviewComponent {

  constructor(private productServ: ProductService, private orderServ: OrderService) { }

  get products() {
    return this.productServ.productsAll;
  }

  get orders()
  {
    return this.orderServ.orders;
  }
}
