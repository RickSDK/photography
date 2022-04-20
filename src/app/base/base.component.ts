import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  public title = 'base title';
  public buttonIdx = 0;
  public userId = 0;
  public cityId = 0;

  constructor() { }

  ngOnInit(): void {
  }
  ngClassSegment(num: number, buttonIdx: number) {
    if (num == buttonIdx)
      return 'btn btn-warning segmentButton roundButton';
    else
      return 'btn btn-success segmentButton roundButton';
  }
  ngClassButtonGroup(num1: number, num2: number) {
    if (num1 == num2)
      return 'btn btn-primary';
    else
      return 'btn btn-secondary';
  }
}
