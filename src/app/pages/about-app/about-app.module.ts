import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutAppPageRoutingModule } from './about-app-routing.module';

import { AboutAppPage } from './about-app.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutAppPageRoutingModule,
    SharedModule
  ],
  declarations: [AboutAppPage]
})
export class AboutAppPageModule {}
