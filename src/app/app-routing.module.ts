import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PhotographersComponent } from './photographers/photographers.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OffersComponent } from './offers/offers.component';
import { ModelsComponent } from './models/models.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'models', component: ModelsComponent },
  { path: 'photographers', component: PhotographersComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'offers', component: OffersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
