import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { Observable } from "rxjs";
import { Product } from "../../../models/product.model";

@Component({
  selector: "store-categoryfilter",
  templateUrl: "categoryFilter.component.html"
})
export class CategoryFilterComponent implements OnInit  {

  public categories: Observable<string[]>;

  //public currentCategory: string = null;
  public filteredPoducts: Observable<Product[]>;

  constructor(private prodService: ProductService)
  {
    this.categories = this.getCategories();
  }

  ngOnInit() {
    //this.categories = this.getCategories();
  }

  getCategories(): Observable<string[]> {
    return this.prodService.categories;
  }

  get currentCategory(): string
  {
    //this.selectedCategory = selectedCategory;
    return this.prodService.filter.category;
  }

  setCurrentCategory(selectedCategory: string)
  {
    //this.selectedCategory = selectedCategory;
    //this.filteredPoducts =
    this.prodService.getProducts(selectedCategory);   //filter products by category
  }
}
