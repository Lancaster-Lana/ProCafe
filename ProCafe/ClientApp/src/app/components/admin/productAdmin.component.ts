import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";

//include jQuery plugins support
var $ = require('jquery'); //import * as $ from 'jquery';
import 'datatables.net-bs4';//require('datatables.net-bs4')();
import 'datatables.net-buttons';//require('datatables.net-buttons')();
import 'datatables.net'; //var dt = require('datatables.net'); //require('datatables.net')();

const productCreateUrl: string = '/admin/productCreate/';
const productEditUrl: string = '/admin/productEdit/';

@Component({
  templateUrl: "productAdmin.component.html"
})
export class ProductAdminComponent implements OnInit, OnDestroy {

  //tableMode: boolean = true;
  searchText: string; //text to filter existing products by name
  products$: Product[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private prodServ: ProductService, private router: Router, private chRef: ChangeDetectorRef) {

    this.dtOptions = {
      "pageLength": 10,
      "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      "dom": '<"top"Bf>rt<"bottom"lip><"clear">',//display on bottom paging
      //destroy: true, //to be destoyed before reinit
      //"data": this.products$,
      retrieve: true,
      "stateSave": true
      //"buttons": ['excel', 'pageLength']
    };
  }

  ngOnInit() {
    this.updateList();
  }

  updateList()
  {
    this.getProducts().subscribe(data =>
    {
      this.products$ = data;
      //Go next
      this.dtTrigger.next();
      //$table = $('.table').dataTable({
      //  "aaData": this.products$,
      //});
    });
  }

  ngOnDestroy()
  {
    this.dtTrigger.unsubscribe();
    //$table.fnDestroy();
  }

  getProducts(): Observable<Product[]> {
    return this.prodServ.productsAll; //getProducts(true, false, null); //category - empty
  }

  //Start creating a new product
  newProduct() {
    this.router.navigate([productCreateUrl]);
  }

  //Start editing the product
  selectProduct(id: number) {
    this.router.navigate([productEditUrl, id]); //TODO: can be modal window\sweet alert
  }

  deleteProduct(id: number) {
    swal.fire({
      title: 'Warning',
      text: 'Are you sure to delete this product?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No',
      position: 'center'
    })
      .then(() => {
        // if confirmed - delete product
        this.prodServ.deleteProduct(id).subscribe(
          data => {
            //if (data == true) {
              swal.fire({
                type: 'success',
                title: 'Deleted!',
                text: 'The product has been deleted.',
                position: 'center'
            });
            //update grid
            this.updateList(); //window.location.reload();
            //}
          },
          error => {
            if (error) {
              console.error(error);
              swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Product deletion error !' + error,
                position: 'center'
              });
            }
          });
      },
        (dismiss) => {
          //Canceled delete
        });
  }
}
