import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppSettings } from './app.settings';

import { AppComponent } from './app.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomersTableService } from './components/customers-table/customers-table.service';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { HttpService } from './http.service';
import { CustomerDetailsComponent } from './containers/customer-details/customer-details.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersTableComponent,
    ToolbarComponent,
    CustomerDetailsComponent,
    CustomerFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppSettings,
    HttpService,
    CustomersTableService,
    CustomerDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
