import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent extends BaseHttpComponent implements OnInit {
  public userList: User[] = [];
  public offerCount: number = 0;
  public newOffers: number = 0;
  public user: any;
  public cityList: any[] = [];

  @ViewChild(LoginModalComponent)
  loginModalComponent!: LoginModalComponent;

  constructor() { super(); }

  ngOnInit(): void {
    this.userList = [];
    this.userId = localStorage.id;
    if (this.userId > 0) {
      this.user = new User(localStorage.userString);
      console.log('xxx', this.user)
    }
    var params = {
      userId: this.userId,
      code: localStorage.code,
      action: 'getMainPage'
    };
    this.executeApi('photoApi.php', params, true);
  }
  gotoCity(city: any) {
    console.log(city);
  }
  postSuccessApi(file: string, data: string) {
    if (!data)
      return;

      this.userList = [];
    //console.log(file, data);
    var sections = data.split('<a>');
    if (sections.length > 1) {
      var counts = [];
      counts = sections[1].split('<b>');
      counts.forEach(element => {
        if (element.length > 3) {
          var c = element.split('|');
          this.cityList.push({id: parseInt(c[0]), city: c[1], state: c[2], modelCount: parseInt(c[3]), photogCount: parseInt(c[4])});
        }
      });
  //    console.log('this.userList', this.userList);

    }

    if (sections.length > 2) {
      var c = sections[2].split('|');
      if (c.length > 1) {
        this.offerCount = parseInt(c[0]);
        this.newOffers = parseInt(c[1]);
      }
    }
  }
  buttonClicked(event: any) {
    this.loginModalComponent.show(this.cityId);
  }
  refreshScreen(event: any) {
    this.ngOnInit();
  }

}


