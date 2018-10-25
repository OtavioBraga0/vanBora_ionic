import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Grupo } from '../../modelos/Grupo'

@IonicPage()
@Component({
  selector: 'page-aluno-home',
  templateUrl: 'aluno-home.html',
})
export class AlunoHomePage {
  
  public arrObjGrupo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) { }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({content: "Carregando Grupos ..."});
    loading.present();
    let postData = new FormData();
    postData.append('Usuario_lng_Codigo', '1');
    this._http.post<Grupo[]>(
      "http://localhost/faculdade/vanBora/grupo", 
      postData
    ).subscribe(arrObjGrupo => {
      this.arrObjGrupo = arrObjGrupo;
      loading.dismiss();
    },(erro => {
      loading.dismiss();
      this._alertCtrl.create({
        title: "Falha",
        subTitle: "Não foi possível carregar os Grupos. Tente novamente mais tarde!",
        buttons: [{text: "OK"}]
      }).present();
    }))
  }

}
