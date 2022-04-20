import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('cityId') cityId: number = 0;
  public cities = [
    {id: 0, city: 'none', state: 'WA', modelCount: 0, photogCount: 0},
    {id: 1, city: 'Seattle', state: 'WA', modelCount: 0, photogCount: 0},
    {id: 2, city: 'Everett', state: 'WA', modelCount: 0, photogCount: 0},
    {id: 3, city: 'Los Angeles', state: 'CA', modelCount: 0, photogCount: 0},
    {id: 4, city: 'New York', state: 'NY', modelCount: 0, photogCount: 0},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
