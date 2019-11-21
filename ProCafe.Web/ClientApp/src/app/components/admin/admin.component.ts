import { Component, OnInit, ChangeDetectorRef} from "@angular/core";
import { AuthenticationService } from "../auth/authentication.service";
import { ProductService } from "../../services/product.service";
import { OrderService } from "../../services/order.service";

//include jQuery plugins support
var $ = require('jquery');
//var dt = require('datatables.net');

//import * as $ from 'jquery';
import 'datatables.net';
//import 'datatables.net-bs4';

@Component({
  templateUrl: "admin.component.html"
})
export class AdminComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private prodServ: ProductService,
    private orderServ: OrderService, private chRef: ChangeDetectorRef) {
  }

  ngOnInit()
  {

  }

  get userName() {
    return this.authService.name;
  }

  get products() {
    return this.prodServ.productsAll;
  }

  get orders() {
    return this.orderServ.orders;
  }
}
