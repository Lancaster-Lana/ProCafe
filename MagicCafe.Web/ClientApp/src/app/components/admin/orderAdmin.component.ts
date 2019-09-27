import { Component } from "@angular/core";
import { Order } from "../../models/order.model";
import { OrderService } from "../../services/order.service";
import { Observable } from "rxjs";

@Component({
  templateUrl: "orderAdmin.component.html"
})
export class OrderAdminComponent {

  constructor(private serv: OrderService)
  {
  }

  get orders(): Observable<Order[]>
  {
    return this.serv.orders;
  }

  markShipped(order: Order)
  {
    this.serv.shipOrder(order);
  }
}
