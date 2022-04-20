import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-toggle',
  templateUrl: './checkbox-toggle.component.html',
  styleUrls: ['./checkbox-toggle.component.scss']
})
export class CheckboxToggleComponent implements OnInit {
  @Input('flag') flag: boolean = false;
  @Input('name') name: string = '';
  @Input('icon') icon: string = '';
  @Input('smallFlg') smallFlg: boolean = false;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
