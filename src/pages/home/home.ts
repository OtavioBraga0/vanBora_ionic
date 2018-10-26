import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  selecionaHomeAluno(){
    this.navCtrl.push(CadastroPage, "a");
  }

  selecionaHomeMotorista(){
    this.navCtrl.push(CadastroPage, "m");
  }

}
