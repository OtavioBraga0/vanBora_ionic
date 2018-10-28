import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoAlunoPage } from './novo-aluno';

@NgModule({
  declarations: [
    NovoAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoAlunoPage),
  ],
})
export class NovoAlunoPageModule {}
