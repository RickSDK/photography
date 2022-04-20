import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photographers',
  templateUrl: './photographers.component.html',
  styleUrls: ['./photographers.component.scss']
})
export class PhotographersComponent extends BaseHttpComponent implements OnInit {
  @ViewChild(LoginModalComponent)
  loginModalComponent!: LoginModalComponent;

  public userList: User[] = [];
  public offerCount:number = 0;
  public newOffers:number = 0;

  constructor(private route: ActivatedRoute) { 
    super(); 
    this.route.queryParams
  	.subscribe(params => { 
  		this.cityId = params.id;
  	});
  }

  ngOnInit(): void {
    this.userId = localStorage.id;
    var params = {
      userId: this.userId,
      code: localStorage.code,
      cityId: this.cityId,
      action: 'getPhotogs'
    };
    this.executeApi('photoApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    if(!data)
      return;

    //console.log(file, data);
    var sections = data.split('<a>');
    if(sections.length>1) {
      var users = [];
      users = sections[1].split('<b>');
      this.userList = [];
      users.forEach(element => {
        if (element.length > 20) {
          var user: User = new User(element);
          this.userList.push(user);
        }
      });
  
      console.log('this.userList', this.userList);
    }
    if(sections.length>2) {
      var c = sections[2].split('|');
      if(c.length>1 ) {
        this.offerCount = parseInt(c[0]);
        this.newOffers = parseInt(c[1]);  
      }
    }
  }
  buttonClicked(event:any) {
    this.loginModalComponent.show(this.cityId);
  }
}
