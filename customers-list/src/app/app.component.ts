import { Component } from '@angular/core';
import * as faker from 'faker';

class smallCustomer {
  // id: string;
  type: number
  name: string;
  country: string;
  websiteUrl: string;
  numberOfEmployees: number;
  contractExpiryDate: string;

  constructor(data) {
    Object.keys(data).forEach(key => {
      this['key'] = data['key'];
    })
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'customers-list';

  ngOnInit() {
    
  }
}
