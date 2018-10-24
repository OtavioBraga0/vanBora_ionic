import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MotoristaHomePage } from './motorista-home';

@NgModule({
  declarations: [
    MotoristaHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MotoristaHomePage),
  ],
})
export class MotoristaHomePageModule {}
