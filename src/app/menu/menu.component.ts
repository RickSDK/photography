import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input('menuNum') menuNum: number = 0;
  @Input('userId') userId: number = 0;
  @Input('cityId') cityId: number = 0;
  
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  ngStyleMenu(num: number) {
    if (num == this.menuNum)
      return { 'color': 'black', 'font-weight': 700 };
    else
      return { 'color': '#666', 'font-weight': 500 };
  }
  signupPressed() {
    this.messageEvent.emit('done');
  }
}
