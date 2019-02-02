import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { UserDetailsComponent } from './containers/user-details/user-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/customers-list', pathMatch: 'full'
  }, 
  {    
    path: 'customers-list', component:CustomersTableComponent
  },
  {
    path:'customer/:id', component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
