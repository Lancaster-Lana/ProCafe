import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UploadFileService } from '../../services/upload.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: "product-detail",
  templateUrl: "productDetailsComponent.component.html"
})
export class ProductDetailsComponent {
  product: Product;

  constructor(private prodService: ProductService, router: Router, activeRoute: ActivatedRoute,
    private uploadService: UploadFileService) {

    let id = Number.parseInt(activeRoute.snapshot.params["id"]);
    if (id)
    {
      this.prodService.getProduct(id)
        .subscribe(result => {
          this.product = result;
        });
    }
    else
    {
      router.navigateByUrl("/");
    }
  }
}
