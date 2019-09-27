import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { AngularFileUploaderComponent } from "angular-file-uploader"; //?
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';

import { UploadFileService } from "../../services/upload.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { Supplier } from "../../models/supplier.model";

const productsUrl: string = '/admin/products/';
const apiImageUploadUrl: string = '/api/file/upload/';

const prodConfig = {
  multiple: false,
  formatsAllowed: ".jpg,.png",
  maxSize: "1",
  uploadAPI: {
    url: apiImageUploadUrl,//"https://example-file-upload-api",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
      //"Authorization": `Bearer ${token}`
    }
  },
  theme: "dragNDrop",
  hideProgressBar: true,
  hideResetBtn: true,
  hideSelectBtn: true
};

@Component({
  selector: "admin-product-editor",
  templateUrl: "productEditor.component.html"
})
export class ProductEditorComponent implements OnInit
{
  product: Product = null; //the currently editing or a new product

  selectedFiles: FileList;
  currentFileUpload: File;
  imageBytes: ArrayBuffer | string ;

  progress: { percentage: number } = { percentage: 0 };
  errorMessage: string = null;
  //@ViewChild('imageUpload') imageUpload: AngularFileUploaderComponent;
  //resetImgUpload: boolean;

  //@Output() productCreated: EventEmitter<Boolean> = new EventEmitter(); //to notify parent (list compenent) that product added

  constructor(private prodServ: ProductService,
        private router: Router, activeRoute: ActivatedRoute,
        private uploadService: UploadFileService)
  {
    let id = Number.parseInt(activeRoute.snapshot.params["id"]); //id from route
    if (id) {
      //Edit selected product
      this.prodServ.getProduct(id)
        .subscribe(result => this.product = result);
    }
    else {
      //Create a new product
      this.product = new Product();
    }
  }

  selectImageFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles[0];

    //Render\display image
    var reader = new FileReader();
    reader.readAsDataURL(this.currentFileUpload);
    reader.onload = (event) => {
      //this.imageBytes = (<FileReader>event.target).result;
      this.product.imageFileString = <string>(<FileReader>event.target).result;
      this.product.imageName = this.currentFileUpload.name;
      /*
      if (this.imageBytes != null) {
        let byteArray = new TextEncoder().encode(<string>this.imageBytes);//new Uint8Array(this.imageBytes);
        this.product.imageContent = byteArray;   //imageblob = (new Blob([byteArray], { type: 'image/gif' }));
      }*/
    }
  }

  /*
  upload()
  {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    //save image to DB (server api call)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
    this.selectedFiles = undefined;
  }*/

  ngOnInit() {
    if (this.product == null)
      this.product = new Product();
  }

  get categories(): Observable<string[]> {
    return this.prodServ.categories;
  }

  goBack()
  {
    this.router.navigate([productsUrl]); //if canceled edited product
    //if (this.product.productId <= 0) this.productCreated.emit(false);  //if canceled creating product by operation Back
  }

  saveProduct()
  {
    if (this.product == null || this.product.productId == null)
    {
      this.prodServ.createProduct(this.product)
        .add(finishAct => {
          this.errorMessage = this.prodServ.errorMsg;

          if (this.errorMessage)
            console.error(this.errorMessage);
          else {
            //Notification success alert
            swal.fire({
              title: 'Congrats !',
              text: 'Product has been saved sucessfully!',
              type: 'success',
              confirmButtonText: 'OK',
              position: 'center'
            }).then(res => {
              
              this.router.navigate([productsUrl]);
              //Notify parent component (list of products) that, new product created (refresh, change its view mode)
              //this.productCreated.emit(true);
            });
          }
        });
    }
    else
     this.prodServ.updateProduct(this.product)
      .add(finishAct => {
        this.errorMessage = this.prodServ.errorMsg;

        if (this.errorMessage)
          console.error(this.errorMessage);
        else
          //Notification success alert
          swal.fire({
            title: 'Congrats !',
            text: 'Product has been saved sucessfully!',
            type: 'success',
            confirmButtonText: 'OK',
            position: 'center'
          }).then(res => {
            //go to refreshed list of all products
            this.router.navigate([productsUrl]);
          });
      })
      /*.catch((error: Response | any) => {
        console.error(error.message || error);
        this.errorMessage = error.message || error;
        //show error alert
        swal({
          title: 'Error!',
          text: this.errorMessage,
          type: 'error',
          confirmButtonText: 'OK',
          position: 'top-start'
        });
      })*/;
  }

  deleteProduct(id: number)
  {
    let deleted: boolean = false;

    swal.fire({
      title: 'Warning',
      text: 'Are you sure to delete this product?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No',
      position: 'center'
    })
      .then(() => {
      //API service call request to delete product
      this.prodServ.deleteProduct(id)
        .toPromise()
        .then((success: boolean) => {
          deleted = success;
          console.log(success);
          if (deleted) {
            swal.fire({
              type: 'success',
              title: 'Success',
              text: 'The product has been deleted !',
              position: 'center'
            }).then(() => {
              this.router.navigate([productsUrl]); //redirect to refreshed list of products

            }).catch((err) => {
              // if (data.hasOwnProperty('error')) {
              //this.alertService.error(data.error);
               //console.error(error);
            });
          }
        })
        .catch(error => {
          //console.error(error);
          deleted = false;
          swal.fire({
            type: 'error',
            title: 'Product deletion error !',
            text: error,
            position: 'center'
          });
        });
    });
  }

  revertChanges()
  {
    //set old version of the product
    if (this.product.productId > 0) {
      //Edit selected product
      this.prodServ.getProduct(this.product.productId)
        .subscribe(result => this.product = result);
    }
    else {
      //clear data for a new product
      this.product = new Product();
    }
  }

  clearProduct() {
    this.product = new Product();
  }

  compareSuppliers(s1: Supplier, s2: Supplier) {
    return s1 && s2 && s1.name == s2.name;
  }
}
