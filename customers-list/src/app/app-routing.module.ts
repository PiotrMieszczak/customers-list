import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/customers-list', pathMatch: 'full'
  }, 
  {    
    path: 'customers-list', component:CustomersTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
