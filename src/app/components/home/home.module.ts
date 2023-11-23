import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { FooterComponent } from './footer/footer.component';
import { CommonComponentsModule } from '../../core/components/common.components.module';

@NgModule({
  declarations: [HomeComponent, HomeMenuComponent, FooterComponent],
  imports: [CommonModule, RouterModule, CommonModule],
})
export class HomeModule {}
