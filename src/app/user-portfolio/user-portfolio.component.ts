import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrls: ['./user-portfolio.component.scss']
})
export class UserPortfolioComponent implements OnInit {
  @Input('user') user: User = new (User);
  public userId: number = 0;
  public adminFlg = false;
  public buttonDisabledFlg = false;

  constructor() { }

  ngOnInit(): void {
    this.userId = localStorage.id;
    console.log('user', this.userId, this.user);
    this.adminFlg = (this.userId == 10 || this.userId == this.user.id);
    if (this.user.portfolioImages.length > 0)
      this.user.currentPortfolioImg = this.user.portfolioImages[0];
  }
  ngClassImageSmall(img: string) {
    if (img == this.user.currentPortfolioImg)
      return 'portfolioPicSmallHighlighted';
    else
      return 'portfolioPicSmall';
  }
  cyclePicIdx() {
    var picIdx = 0;
    var x = 0;
    this.user.portfolioImages.forEach(element => {
      x++;
      if (element == this.user.currentPortfolioImg)
        picIdx = x;
    });
    if (picIdx >= this.user.portfolioImages.length)
      picIdx = 0;

    var images = this.user.imgString.split(':');
    this.user.currentPortfolioImg = this.user.portfolioImages[picIdx];
    this.user.currentPortfolioId = parseInt(images[picIdx]);
    console.log('picIdx', picIdx)
    console.log('images', images)
    console.log('currentPortfolioId', this.user.currentPortfolioId)
  }
  deletePhotoPressed() {
    this.buttonDisabledFlg = true;
  }
}
