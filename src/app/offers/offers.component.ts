import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { Offer } from '../classes/offer';
import { ActivatedRoute } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent extends BaseHttpComponent implements OnInit {
  public offerList: Offer[] = [];
  public selectedOffer: any;
  public user: any;

  constructor(private route: ActivatedRoute) {
    super();
    this.route.queryParams
      .subscribe(params => {
        this.cityId = params.id;
        console.log(this.cityId);
      });
  }

  ngOnInit(): void {
    this.userId = localStorage.id;
    this.user = new User(localStorage.userString);
    var params = {
      userId: this.userId,
      code: localStorage.code,
      action: 'getOffers'
    };
    this.executeApi('photoApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    if (!data)
      return;

    console.log('xxx', file, data);
    this.offerList = [];

    var sections = data.split('<a>');
    if (sections.length > 1) {
      var offers = [];
      offers = sections[1].split('<b>');
      this.offerList = [];
      offers.forEach(element => {
        if (element.length > 20) {
          var offer: Offer = new Offer(element);
          this.offerList.push(offer);
        }
      });
      console.log('this.offerList', this.offerList);
    }
  }
  ngClassStatus(status: string) {
    if (status == 'ACCEPTED')
      return 'greenClass';

    if (status == 'DECLINED')
      return 'redClass';
    else
      return 'blackClass';
  }
  acceptOffer(offer: Offer) {
    var params = {
      userId: this.userId,
      code: localStorage.code,
      offerId: offer.id,
      action: 'acceptOffer'
    };
    this.executeApi('photoApi.php', params, true);

  }
  declineOffer(offer: Offer) {
    var params = {
      userId: this.userId,
      code: localStorage.code,
      offerId: offer.id,
      action: 'declineOffer'
    };
    console.log('params', params);
    this.executeApi('photoApi.php', params, true);

  }
  editLocation(offer: Offer) {

  }
  editTime(offer: Offer) {

  }
  updateLocation(offer: Offer) {
    this.selectedOffer = offer;
    this.selectedOffer.showEditDayFLg = false;
    this.selectedOffer.showEditLocFLg = false;
    var location = this.checkRequiredField('location');
    var params = {
      userId: this.userId,
      code: localStorage.code,
      offerId: offer.id,
      location: location,
      action: 'updateOfferLocation'
    };
    console.log('params', params);
    this.executeApi('photoApi.php', params, true);
  }
  updateShootDay(offer: Offer) {
    this.selectedOffer = offer;
    this.selectedOffer.showEditDayFLg = false;
    this.selectedOffer.showEditLocFLg = false;
    var day = this.checkRequiredField('day');
    var shootTime = this.checkRequiredField('shootTime');
    //var newDate = new Date(day+' '+shootTime);
    //console.log(newDate);
    var params = {
      userId: this.userId,
      code: localStorage.code,
      offerId: offer.id,
      shootDay: day,
      shootTime: shootTime,
      action: 'updateOfferDay'
    };
    console.log('params', params);
    this.executeApi('photoApi.php', params, true);
  }
  acceptTimeOrLoc(offer: Offer, locFlg: boolean) {
    var params = {
      userId: this.userId,
      code: localStorage.code,
      offerId: offer.id,
      action: (locFlg) ? 'acceptOfferLocation' : 'acceptOfferTime'
    };
    console.log('params', params);
    this.executeApi('photoApi.php', params, true);
  }
  sendOfferMessage(offer: Offer) {
    var user = new User(localStorage.userString);
    var message = this.checkRequiredField('message');
    var params = {
      userId: this.userId,
      code: localStorage.code,
      offerId: offer.id,
      message: message,
      firstName: user.firstName,
      action: 'sendMessage'
    };
    console.log('params', params);
    if (message) {
      this.executeApi('photoApi.php', params, true);
    }
  }
}
