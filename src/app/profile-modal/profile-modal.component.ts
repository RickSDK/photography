import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { BaseHttpComponent } from '../base-http/base-http.component';

declare var $: any;
declare var displayFixedPopup: any;

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent extends BaseHttpComponent implements OnInit {
  public user: User = new User('');
  public showFlg = false;
  public errorMessage = '';
  public showModelBookingFormFlg = false;
  // public typeIdx = 0;
  public totalCost = 0;
  public hoursIdx = 0;
  public currentPortfolioImg: string = '';
  public loadUserFlg = false;
  public types: any = [{ id: 1, name: 'Portrait', nudeFlg: false }];
  public selectedType: any = this.types[0];
  public bookAPhotogFlg: boolean = false;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
  }
  displayThisUser() {
    console.log('this.user', this.user);
    this.types = [
      { id: 1, name: 'Portrait', nudeFlg: false },
    ];
    if (this.user.fashionFlg)
      this.types.push({ id: 2, name: 'Fashion', nudeFlg: false });
    if (this.user.fitnessFlg)
      this.types.push({ id: 3, name: 'Fitness', nudeFlg: false });
    if (this.user.paintFlg)
      this.types.push({ id: 4, name: 'Body Paint', nudeFlg: true });
    if (this.user.boudoirFlg)
      this.types.push({ id: 5, name: 'Boudoir', nudeFlg: true });
    if (this.user.nudeFlg)
      this.types.push({ id: 6, name: 'Nude', nudeFlg: true });
    if (this.user.eroticFlg)
      this.types.push({ id: 7, name: 'Erotic', nudeFlg: true });

    if (this.user.twoHourFlg)
      this.hoursIdx = 1;

    this.loadingFlg = false;
    this.showFlg = true;
    this.calculateCost();
    this.showModelBookingFormFlg = false;
    if (this.user.portfolioImages.length > 0)
      this.currentPortfolioImg = this.user.portfolioImages[0];

    setTimeout(() => {
      displayFixedPopup('profileModal', true);
    }, 100);


  }
  showUser(id: number, cityId: number) {
    this.showFlg = !this.showFlg;
    this.loadingFlg = true;
    this.loadUserFlg = true;


    var params = {
      userId: localStorage.id,
      code: localStorage.code,
      row_id: id,
      action: 'loadUser'
    }
    if (!this.errorMessage) {
      this.loadingFlg = true;
      this.executeApi('photoApi.php', params, true);
    }

  }
  show(user: User, cityId: number) {
    //this.typeIdx = 0;
    this.totalCost = 0;
    this.hoursIdx = 0;
    this.showModelBookingFormFlg = false;
    this.errorMessage = '';
    this.successFlg = false;

    if (localStorage.id && user.id == localStorage.id)
      this.router.navigate(['profile'], { queryParams: { id: cityId } });
    else {
      this.user = user;
      this.displayThisUser();
    }
  }
  ngClassImageSmall(img: string) {
    if (img == this.currentPortfolioImg)
      return 'portfolioPicSmallHighlighted';
    else
      return 'portfolioPicSmall';
  }
  cyclePicIdx() {
    var picIdx = 0;
    var x = 0;
    this.user.portfolioImages.forEach(element => {
      x++;
      if (element == this.currentPortfolioImg)
        picIdx = x;
    });
    if (picIdx >= this.user.portfolioImages.length)
      picIdx = 0;

    this.currentPortfolioImg = this.user.portfolioImages[picIdx];
  }
  outerClicked() {
    console.log('outer');
    this.showFlg = !this.showFlg;
  }
  setType(type: any) {
    console.log('xxx', type);
    this.selectedType = type;
    this.calculateCost();
  }
  setHours(num: number) {
    this.hoursIdx = num;
    this.calculateCost();
  }
  calculateCost() {
    if (this.selectedType.nudeFlg)
      this.totalCost = this.user.hourlyRate + this.user.nudeFees;
    else
      this.totalCost = this.user.hourlyRate;

    var hours = this.hoursIdx + 1;
    var hourlyRate = this.totalCost;
    var totalCost = hourlyRate;

    if (hours == 3)
      hourlyRate *= .9;
    if (hours == 4)
      hourlyRate *= .8;

    totalCost = hourlyRate * hours;
    totalCost /= 5;
    totalCost = Math.round(totalCost);
    this.totalCost = totalCost * 5;;
  }
  sendThisRequest() {
    this.errorMessage = '';
    if (!this.user.id) {
      this.errorMessage = 'Sign up first! You are not logged in.'
      return;
    }
    var day = $('#day').val();
    var shootTime = $('#shootTime').val();

    var message = this.checkRequiredField('message');
    var location = this.checkRequiredField('location');
    var params = {
      userId: localStorage.id,
      code: localStorage.code,
      sellerId: this.user.id,
      typeIdx: this.selectedType.id,
      type: this.selectedType.name,
      hours: this.hoursIdx + 1,
      message: message,
      totalCost: this.totalCost,
      day: day,
      shootTime: shootTime,
      location: location,
      action: 'offerMade'
    }
    console.log(params);

    if (!this.errorMessage) {
      this.loadingFlg = true;
      //this.successFlg = true;
      this.showModelBookingFormFlg = false;
      this.executeApi('photoApi.php', params, true);
    }
  }

  postSuccessApi(file: string, data: string) {
    console.log('xxx postSuccessApi', file, data);
    if (this.loadUserFlg) {
      var c = data.split('<a>');
      if (c.length > 1) {
        this.user = new User(c[1]);
        this.displayThisUser();
      }
      return;
    }
    if (this.verifyServerResponse(data)) {
      this.successFlg = true;
    } else {
      this.showModelBookingFormFlg = true;
    }
  }
  postErrorApi(file: string, error: string) {
    console.log('xxx postErrorApi', file, error);
    this.errorMessage = error;
    this.showModelBookingFormFlg = true;
    this.loadingFlg = false;
  }
  innerClicked(event: any) {
    console.log('innerClicked');
    event.stopPropagation();
  }
  booksession(bookAPhotogFlg: boolean) {
    this.bookAPhotogFlg = bookAPhotogFlg;
    this.showModelBookingFormFlg = true;
  }
}
