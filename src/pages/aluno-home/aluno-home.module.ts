import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlunoHomePage } from './aluno-home';

@NgModule({
  declarations: [
    AlunoHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AlunoHomePage),
  ],
})
export class AlunoHomePageModule {}
