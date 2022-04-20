import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var getTextFieldValue: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseHttpComponent implements OnInit {
  public user: User;
  public imgSrc: string = '';
  public fileToUpload: any;
//  public editProfileModeFlg = false;
  public addPortfolioFlg = false;
  public imgData: string = '';
  public fileSelectedFlg = false;
  public fileName: string = '';
  public photogFlg: boolean = false;
  public modelFlg: boolean = false;
  public maleFlg: boolean = false;
  public femaleFlg: boolean = false;
  public successFlg: boolean = false;
  public fashionFlg: boolean = false;
  public fitnessFlg: boolean = false;
  public paintFlg: boolean = false;
  public boudoirFlg: boolean = false;
  public eroticFlg: boolean = false;
  public nudeFlg: boolean = false;
  public totalCost: number = 20;
  public hourlyIdx: number = 1;
  public hourlyRate: number = 20;
  public nudeIdx: number = 0;
  public nudeRate: number = 0;
  public selectedCity = '';
  public phoneValue = '';
  public displayMode = 0;
  public twoHourFlg: boolean = false;
  public deleteButtonDisabledFlg: boolean = false;
  public adminFlg: boolean = false;
  

  constructor(private router: Router, private route: ActivatedRoute) {
    super();
    this.route.queryParams
      .subscribe(params => {
        this.cityId = params.id;
        //     if (this.cityId > 0 && this.cities.length > this.cityId)
        //      this.selectedCity = this.cities[this.cityId - 1].city;
      });
    this.user = new User(localStorage.userString);
    this.maleFlg = this.user.gender == 'M';
    this.femaleFlg = this.user.gender == 'F';
    this.photogFlg = this.user.photogFlg;
    this.modelFlg = this.user.modelFlg;
    this.nudeFlg = this.user.nudeFlg;
    this.boudoirFlg = this.user.boudoirFlg;
    this.fashionFlg = this.user.fashionFlg;
    this.fitnessFlg = this.user.fitnessFlg;
    this.paintFlg = this.user.paintFlg;
    this.eroticFlg = this.user.eroticFlg;
    this.phoneValue = this.user.phone;
    this.twoHourFlg = this.user.twoHourFlg;
    this.hourlyIdx = 0;
    this.selectedCity = this.user.cityBase || 'Seattle';
    if (this.user.hourlyRate == 0)
      this.user.hourlyRate = 20;

    if (this.user.hourlyRate > 200)
      this.hourlyIdx = 6;
    else if (this.user.hourlyRate > 160)
      this.hourlyIdx = 5;
    else if (this.user.hourlyRate >= 160)
      this.hourlyIdx = 4;
    else if (this.user.hourlyRate >= 120)
      this.hourlyIdx = 3;
    else if (this.user.hourlyRate >= 80)
      this.hourlyIdx = 2;
    else if (this.user.hourlyRate >= 40)
      this.hourlyIdx = 1;

    this.nudeIdx = 0;
    if (this.user.nudeFees >= 200)
      this.nudeIdx = 4;
    else if (this.user.nudeFees >= 100)
      this.nudeIdx = 3;
    else if (this.user.nudeFees >= 50)
      this.nudeIdx = 2;
    else if (this.user.nudeFees >= 25)
      this.nudeIdx = 1;
    
    //this.hourlyRate = this.user.hourlyRate;
    this.nudeRate = this.user.nudeFees;
    // this.totalCost = this.hourlyRate + this.nudeRate;
    this.setHourlyRate(this.hourlyIdx);
  }

  ngOnInit(): void {
    this.userId = localStorage.id;
    this.adminFlg = (this.userId == 10 || this.userId == this.user.id);
  }
  validateTelephone(event: any) {
    var key = event.keyCode || event.charCode;
    var phone = event.target.value.replace(/\D/g, "");
    if (phone == '1')
      phone = '';
    var areaCode = phone.substring(0, 3);
    var prefix = phone.substring(3, 6);
    var mainNum = phone.substring(6, 10);
    if (areaCode.length == 3 && prefix.length > 0) {
      if (prefix.length == 3 && mainNum.length > 0) {
        phone = '(' + areaCode + ') ' + prefix + '-' + mainNum;
      } else {
        phone = '(' + areaCode + ') ' + prefix;
      }
    }
    this.phoneValue = phone;

    $('#phone').val(this.phoneValue);
  }


  selectCity(event: any) {
    this.selectedCity = event.target.value;
    console.log(this.selectedCity);
  }
  setHourlyRate(hourlyIdx: number) {
    this.hourlyIdx = hourlyIdx;
    var rates = [20, 40, 80, 120, 160, 200, 300];
    this.hourlyRate = rates[hourlyIdx];
    this.totalCost = this.hourlyRate + this.nudeRate;
  }
  setNudeRate(nudeIdx: number) {
    this.nudeIdx = nudeIdx;
    var rates = [0, 25, 50, 100, 200];
    this.nudeRate = rates[nudeIdx];
    this.totalCost = this.hourlyRate + this.nudeRate;
  }
  toggleSex(maleFlg: boolean) {
    this.maleFlg = maleFlg;
    this.femaleFlg = !this.maleFlg;
  }
  logoutPressed() {
    localStorage.id = 0;
    this.userId = 0;
    localStorage.email = '';
    localStorage.userString = '';
    this.router.navigate(['']);
  }

  uploadProfilePressed() {
    this.errorMessage = '';
    var email = this.checkRequiredField('emailField');
    var phone = this.checkRequiredField('phone');
    var firstName = this.checkRequiredField('firstName');
    var lastName = this.checkRequiredField('lastName');
    var city = this.checkRequiredField('city');
    var bio = this.checkRequiredField('bio');
    var availability = this.checkRequiredField('availability');
    var params = {
      userId: localStorage.id,
      code: localStorage.code,
      email: email,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      city: city,
      bio: bio,
      availability: availability,
      hourlyRate: this.hourlyRate,
      nudeRate: this.nudeRate,
      nudeFlg: (this.nudeFlg) ? 'Y' : '',
      twoHourFlg: (this.twoHourFlg) ? 'Y' : '',
      boudoirFlg: (this.boudoirFlg) ? 'Y' : '',
      fashionFlg: (this.fashionFlg) ? 'Y' : '',
      fitnessFlg: (this.fitnessFlg) ? 'Y' : '',
      paintFlg: (this.paintFlg) ? 'Y' : '',
      eroticFlg: (this.eroticFlg) ? 'Y' : '',
      photogFlg: (this.photogFlg) ? 'Y' : '',
      modelFlg: (this.modelFlg) ? 'Y' : '',
      gender: (this.maleFlg) ? 'M' : 'F',
      selectedCity: this.selectedCity,
      action: 'updateProfileInfo'
    };
    console.log(params);
    if (!this.errorMessage) {
      this.displayMode = 0;
      this.executeApi('photoApi.php', params, true);
    }
  }
  addPhotoPressed() {
    this.addPortfolioFlg = !this.addPortfolioFlg;
  }
  updateCost() {
    var setupRate = getTextFieldValue('setupRate') || "0";
    var hourlyRate = getTextFieldValue('hourlyRate') || "0";
    var boudoirRate = getTextFieldValue('boudoirRate') || "0";

    this.totalCost = parseInt(setupRate) + parseInt(hourlyRate) + parseInt(boudoirRate);
  }
  uploadPortImagePressed() {
    this.successFlg = false;
    this.imgData = $('#myImg').attr('src');
    console.log('xxx', this.imgData.length);
    this.addPortfolioFlg = false;
    var params = {
      userId: localStorage.id,
      code: localStorage.code,
      image: this.imgData,
      action: 'addPortfolioPic'
    };
    this.executeApi('photoApi.php', params, true);
  }
  uploadImagePressed() {
    this.successFlg = false;
    this.imgData = $('#myImg').attr('src');
    console.log('xxx', this.imgData.length);
    var params = {
      userId: localStorage.id,
      code: localStorage.code,
      image: this.imgData,
      fileName: this.fileName,
      action: 'addProfilePic'
    };
    this.executeApi('photoApi.php', params, true);
  }
  deletePhotoPressed() {
    this.deleteButtonDisabledFlg = true;
    var images = this.user.imgString.split(':');
    var imageList:any = [];
    console.log('xxx', this.user.currentPortfolioImg, this.user.currentPortfolioId);
    images.forEach(element => {
      if(parseInt(element) > 0 && parseInt(element) != this.user.currentPortfolioId) {
        imageList.push(element)
      }
    });

    var portfolioImages:any = [];
    this.user.portfolioImages.forEach(element => {
      if(element != this.user.currentPortfolioImg) {
        portfolioImages.push(element)
      }
    });

    this.user.imgString = imageList.join(':');
    this.user.portfolioImages = portfolioImages;

    if(this.user.portfolioImages.length>0) {
      this.user.currentPortfolioImg = this.user.portfolioImages[0];
      this.user.currentPortfolioId = parseInt(images[0]);  
    }

    var params = {
      userId: localStorage.id,
      code: localStorage.code,
      uid: this.user.id,
      imgString: this.user.imgString,
      action: 'deletePortfolioPic'
    };
    this.executeApi('photoApi.php', params, true);
    
  }
  postSuccessApi(file: string, data: string) {
    console.log('xxx postSuccessApi', file, data);
    this.deleteButtonDisabledFlg = false;
    if (this.verifyServerResponse(data)) {
      this.successFlg = true;
      var c = data.split('<b>');
      if (c.length > 1) {
        localStorage.userString = c[1];
        this.user = new User(localStorage.userString);
      }
      if (this.imgData) {
        if(this.displayMode==1)
          $('#profileImg').attr('src', this.imgData);
        this.fileSelectedFlg = false;
        this.imgData = '';
      }
    }
  }

  handleFileInput(event: any) {
    var files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(this.fileToUpload);
  }
  onSelectFile(event: any) {
    if (event && event.target.files && event.target.files[0]) {

      this.fileSelectedFlg = true;
      var files: FileList = event.target.files;
      this.fileName = event.target.files[0].name;
      console.log('xxx', this.fileName);

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed

        var image = new Image();
        if (event.target && event.target.result)
          image.src = event.target.result.toString();

        //   var inputFieldObj = this.inputFieldObj;
        image.onload = function () {
          console.log('Full size: ', image.src.length, image.width, image.height);
          var smallImgSrc = imageToDataUri(image);

          var smallImage = new Image();
          smallImage.src = smallImgSrc.toString();


          //$('#myImg').attr('src', smallImage.src);

          //var imgData = this.imgData;
          smallImage.onload = function () {
            $('#myImg').attr('src', smallImgSrc);
            console.log('New Size: ', smallImage.src.length, smallImage.width, smallImage.height);
          }
        }
        this.imgData = image.src;
      }
    }
  }

}
function imageIsLoaded(e: any) {
  $('#myImg').attr('src', e.target.result);
};
function imageToDataUri(img: any) {
  // create an off-screen canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var MAXSIZE = 480;
  var pct;
  if (img.width > img.height) {
    if (img.width > MAXSIZE) {
      pct = MAXSIZE / img.width;
    } else {
      return img.src;
    }
  } else {
    if (img.height > MAXSIZE) {
      pct = MAXSIZE / img.height;
    } else {
      return img.src;
    }
  }

  var newHeight = img.height * pct;
  var newWidth = img.width * pct;

  if (newHeight < 200 || newWidth < 200) {
    return img.src;
  }

  canvas.height = newHeight;
  canvas.width = newWidth;

  // set its dimension to target size
  //canvas.width = width;
  //canvas.height = height;

  // draw source image into the off-screen canvas:
  if (ctx)
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
  // encode image to data-uri with base64 version of compressed image
  //jw1945 so the default is png... from canvas
  // we want to use jpeg and we will
  //set the quality to .8 to save on space
  //in database quality looks pretty good can adjust
  //quality values are 1.0 to 0.1
  return canvas.toDataURL('image/jpeg', 0.8);
}