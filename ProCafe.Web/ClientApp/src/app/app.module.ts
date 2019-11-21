import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatTabsModule, MatProgressBarModule, MatTableModule, MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AgmCoreModule } from '@agm/core'; // GoogleMaps
import { DataTablesModule } from 'angular-datatables'; //JQuery plugin for data filtering, paging
import { FileUploadModule, FileSelectDirective } from 'ng2-file-upload';

//Translate modules 
import { TranslateModule, TranslateLoader, TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';

//Custom modules
import { RoutingConfig, GoogleMapConfig } from './app-routing.module';
import { AuthModule } from './components/auth/auth.module';
import { AdminModule } from './components/admin/admin.module';
import { StoreModule } from './components/store/store.module';
//import { ChatModule } from './components/chat/ChatModule';

//Services
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { AuthenticationService } from './components/auth/authentication.service';

//Shared Components
import { AppComponent } from './components/app.component';
import { ConfigurationService } from './services/configuration.service';
import { LocalStoreManager } from './services/local-store-manager.service';

//declare module 'googlemaps';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [AppComponent],
  imports: [
    BrowserModule,AgmCoreModule,  HttpClientModule,
    RouterModule, RoutingConfig, GoogleMapConfig,
    CommonModule, FormsModule, ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader//useFactory: HttpLoaderFactory, deps: [HttpClient]
      }
    }),
    DataTablesModule, MatAutocompleteModule,
    FileUploadModule,
      MatDialogModule, MatTabsModule, MatProgressBarModule, MatTableModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, BrowserAnimationsModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, LayoutModule, MatToolbarModule, MatSidenavModule, MatListModule,
      AuthModule, AdminModule, StoreModule//, ChatModule
  ]
  , exports: [AppComponent, TranslateModule] //CommonModule, FormsModule, ReactiveFormsModule,
  , providers: [ConfigurationService, LocalStoreManager, AppTranslationService, TranslateService,
      ProductService, CartService, OrderService, AuthenticationService]// AdminService,
  , bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
