import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { BaseHttpComponent } from '../base-http/base-http.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent extends BaseHttpComponent implements OnInit {
  @ViewChild(LoginModalComponent)
  loginModalComponent!: LoginModalComponent;
  constructor() { super(); }

  ngOnInit(): void {
    this.userId = localStorage.id;
  }
  buttonClicked(event:any) {
    this.loginModalComponent.show(1);
  }
}
