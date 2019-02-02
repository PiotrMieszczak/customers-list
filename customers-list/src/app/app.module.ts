import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomersTableService } from './components/customers-table/customers-table.service';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersTableComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    CustomersTableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
