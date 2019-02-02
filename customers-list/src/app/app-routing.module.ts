import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { CustomerDetailsComponent } from './containers/customer-details/customer-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/customers-list', pathMatch: 'full'
  }, 
  {    
    path: 'customers-list', component:CustomersTableComponent
  },
  {
    path:'customer/:id', component: CustomerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
