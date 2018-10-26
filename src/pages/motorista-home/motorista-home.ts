import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Grupo } from '../../modelos/Grupo';
import { GrupoPage } from '../grupo/grupo';
import { AppModule } from '../../app/app.module';

@IonicPage()
@Component({
  selector: 'page-motorista-home',
  templateUrl: 'motorista-home.html',
})
export class MotoristaHomePage {

  public arrObjGrupo;
  public oGrupo: Grupo;
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({content: "Carregando Grupos ..."});
    loading.present();
    let Usuario_lng_Codigo = this.navParams.data;
    let postData = new FormData();
    postData.append('Usuario_lng_Codigo', Usuario_lng_Codigo);
    this._http.post<Grupo[]>(
      this._url + "grupo", 
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

  selecionaGrupo(Grupo_lng_Codigo){
    this.navCtrl.push(GrupoPage, Grupo_lng_Codigo);
  }

}
