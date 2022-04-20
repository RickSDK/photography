import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { BaseHttpComponent } from './base-http/base-http.component';
import { PageShellComponent } from './page-shell/page-shell.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ButtonComponent } from './button/button.component';
import { LoginPopupComponent } from './popups/login-popup/login-popup.component';
import { FormInputComponent } from './form-input/form-input.component';
import { InfoPopupComponent } from './popups/info-popup/info-popup.component';
import { SpinnerComponent } from './popups/spinner/spinner.component';
import { ProfileSmallComponent } from './profile-small/profile-small.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PhotographersComponent } from './photographers/photographers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OffersComponent } from './offers/offers.component';
import { ModelsComponent } from './models/models.component';
import { CheckboxToggleComponent } from './checkbox-toggle/checkbox-toggle.component';
import { UserPortfolioComponent } from './user-portfolio/user-portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseHttpComponent,
    PageShellComponent,
    MainMenuComponent,
    ButtonComponent,
    LoginPopupComponent,
    FormInputComponent,
    InfoPopupComponent,
    SpinnerComponent,
    ProfileSmallComponent,
    HeaderComponent,
    MenuComponent,
    PhotographersComponent,
    AboutUsComponent,
    ProfileModalComponent,
    LoginModalComponent,
    UserProfileComponent,
    OffersComponent,
    ModelsComponent,
    CheckboxToggleComponent,
    UserPortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
