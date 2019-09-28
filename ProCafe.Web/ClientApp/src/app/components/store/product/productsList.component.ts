import { Component  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from "../../../models/product.model";

import { CartService } from '../../../services/cart.service';
import { ProductService } from "../../../services/product.service";

@Component({
  selector: "products-list",
  templateUrl: "productsList.component.html",
  styleUrls: ["productsList.component.css"]
})
export class ProductsListComponent {

  productCount: number = 0;
  selectedCount: { [prodId: number]: number } = {}; //dictionary with selected numbers of products

  constructor(private router: Router, private route: ActivatedRoute,
    private prodServ: ProductService, private cartServ: CartService)//temp cart for ngModel
  {
  }

  get products() {
    return this.prodServ.productsFiltered; //get products filtered by category (prodServ = Mediator)
  }

  public addToCart(product: Product)
  {
    this.cartServ.addProduct(product);
    let prodCount = this.cartServ.selections.find(function (ps) {
      return ps.productId == product.productId;
    }).quantity;

    //to display number of units of sertain product
    this.selectedCount[product.productId] = prodCount; //update real amount ordered product
   }
}
