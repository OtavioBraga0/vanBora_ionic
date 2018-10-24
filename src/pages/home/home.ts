import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlunoHomePage } from '../aluno-home/aluno-home';
import { MotoristaHomePage } from '../motorista-home/motorista-home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  selecionaHomeAluno(){
    this.navCtrl.push(AlunoHomePage);
  }

  selecionaHomeMotorista(){
    this.navCtrl.push(MotoristaHomePage);
  }

}
