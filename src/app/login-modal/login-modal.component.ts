import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';

declare var $: any;
declare var getTextFieldValue: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  public showFlg = false;
  public showLoginFlg: boolean = true;
  public showCreateAccountFlg: boolean = false;
  public photogFlg: boolean = false;
  public modelFlg: boolean = false;
  public maleFlg: boolean = false;
  public femaleFlg: boolean = false;
  public successFlg: boolean = false;
  public cityId:number = 0;


  constructor() { super(); }

  ngOnInit(): void {
  }
  show(cityId: number) {
    console.log('cityId', cityId);
    this.cityId = cityId;
    this.showFlg = true;
    this.showLoginFlg = true;
    this.showCreateAccountFlg = false;
    this.loadingFlg = false;
    this.photogFlg = false;
    this.modelFlg = false;
    this.maleFlg = false;
    this.femaleFlg = false;
    this.successFlg = false;
    this.errorMessage = '';
  }
  outerClicked() {
    this.showFlg = !this.showFlg;
  }
  innerClicked(event: any) {
    event.stopPropagation();
  }
  togglePhotogFlg() {
    this.photogFlg = !this.photogFlg;
  }
  toggleModelFlg() {
    this.modelFlg = !this.modelFlg;
  }
  toggleSex(maleFlg: boolean) {
    this.maleFlg = maleFlg;
    this.femaleFlg = !this.maleFlg;
  }
  loginPressed() {

    var email = getTextFieldValue('emailField');
    var password = getTextFieldValue('passwordField');
    if (email.length == 0) {
      this.errorMessage = 'Email field is blank';
      return;
    }
    if (password.length == 0) {
      this.errorMessage = 'Password field is blank';
      return;
    }
    localStorage.email = email;
    localStorage.code = btoa(password);
    var params = {
      email: email,
      code: localStorage.code,
      action: 'login'
    };
    this.executeApi('photoLogin.php', params, true);

    this.showLoginFlg = false;
    this.loadingFlg = true;
  }
  postSuccessApi(file: string, data: any) {
    var c = data.split('<b>');
    if (c.length > 1) {
      var user: User = new User(c[1]);
      localStorage.userString = c[1];
      localStorage.id = user.id;
      this.successFlg = true;
      this.messageEvent.emit('refresh');
      console.log('user', data, user);
    } else {
      this.errorMessage = 'data';
    }
  }
  createAccountPressed() {

    var firstName = getTextFieldValue('firstName');
    var lastName = getTextFieldValue('lastName');
    var email = getTextFieldValue('emailField3');
    var password = getTextFieldValue('passwordField2');
    var passwordField3 = getTextFieldValue('passwordField3');
    if (email.length == 0) {
      this.errorMessage = 'Email field is blank';
      return;
    }
    if (firstName.length == 0) {
      this.errorMessage = 'firstName field is blank';
      return;
    }
    if (lastName.length == 0) {
      this.errorMessage = 'lastName field is blank';
      return;
    }
    if (password.length == 0) {
      this.errorMessage = 'Password field is blank';
      return;
    }
    if (password != passwordField3) {
      this.errorMessage = 'Passwords dont match';
      return;
    }
    localStorage.email = email;
    localStorage.code = btoa(password);
    var params = {
      email: email,
      code: localStorage.code,
      firstName: firstName,
      lastName: lastName,
      cityId: this.cityId,
      photogFlg: (this.photogFlg) ? 'Y' : '',
      modelFlg: (this.modelFlg) ? 'Y' : '',
      gender: (this.maleFlg) ? 'M' : 'F',
      action: 'createAccount'
    };
    console.log('params', params);
    this.executeApi('photoLogin.php', params, true);

    this.showCreateAccountFlg = false;
    this.loadingFlg = true;
  }
  toggleAccountCreate() {
    this.showLoginFlg = !this.showLoginFlg;
    this.showCreateAccountFlg = !this.showCreateAccountFlg;
  }
}
