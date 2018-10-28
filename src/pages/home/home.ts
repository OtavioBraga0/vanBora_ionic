import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../../modelos/Aluno';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public oAluno = <Aluno>{};

  constructor(public navCtrl: NavController, private _http: HttpClient) {}

  ionViewDidLoad() {
    
  }


  selecionaHomeAluno(){
    this.navCtrl.push(CadastroPage, "a");
  }

  selecionaHomeMotorista(){
    this.navCtrl.push(CadastroPage, "m");
  }

  
}
