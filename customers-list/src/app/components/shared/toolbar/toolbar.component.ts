import { Component, OnInit, Input } from '@angular/core';
import { ToolBarData } from '../../../classes/toolbarData';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() data: ToolBarData;
  constructor() { }

  ngOnInit() {
  }

}
