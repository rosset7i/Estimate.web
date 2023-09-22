import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeMenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class HomeModule { }
