import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-profile-small',
  templateUrl: './profile-small.component.html',
  styleUrls: ['./profile-small.component.scss']
})
export class ProfileSmallComponent implements OnInit {
  @Input('user') user: User = new User();

  constructor() { }

  ngOnInit(): void {
  }

}
