import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { IonicModule } from '@ionic/angular';
const exportComponents = [
  HeaderComponent,
];

@NgModule({
  declarations: [
    ...exportComponents
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports: [
    ...exportComponents
  ]
})
export class SharedModule { }
