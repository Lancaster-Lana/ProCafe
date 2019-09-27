import { Component } from "@angular/core";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "store-pagination",
  templateUrl: "pagination.component.html"
})
export class PaginationComponent {

  constructor(private prodService: ProductService) { }

  get current(): number {
    return this.prodService.pagination.currentPage;
  }

  get pages(): number[] {
    if (this.prodService.productsAll != null) {
      let productsCount = 0;
      this.prodService.productsAll.subscribe((allProducts) => { productsCount = allProducts.length; })

      return Array(Math.ceil(productsCount / this.prodService.pagination.productsPerPage)).fill(0).map((x, i) => i + 1);
    } else {
      return [];
    }
  }

  changePage(newPage: number) {
    this.prodService.pagination.currentPage = newPage;
  }
}
