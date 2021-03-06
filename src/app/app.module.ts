import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FormFieldControlService } from './components/shared/form-field-service/form-field-control.service';
import { DynamicFormFieldComponent } from './components/customer-form/dynamic-form-field/dynamic-form-field.component';
import { CustomerFormService } from './components/customer-form/customer-form.service';
import { CustomHttpInterceptor } from './http.interceptor';
import { ErrorHandlerDialogComponent } from './error-handler-dialog/error-handler-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersTableComponent,
    ToolbarComponent,
    CustomerDetailsComponent,
    CustomerFormComponent,
    DynamicFormFieldComponent,
    ErrorHandlerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppSettings,
    HttpService,
    CustomersTableService,
    CustomerDetailsComponent,
    FormFieldControlService,
    CustomerFormService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true}
  ],
  entryComponents: [ErrorHandlerDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
