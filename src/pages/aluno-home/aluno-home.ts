import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Grupo } from '../../modelos/Grupo'
import { AppModule } from '../../app/app.module';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-aluno-home',
  templateUrl: 'aluno-home.html',
})
export class AlunoHomePage {
  
  public arrObjGrupo: Grupo[];
  private _url:string = AppModule.getUrl();
  private Usuario_lng_Codigo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) { }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({content: "Carregando Grupos ..."});
    loading.present();
    this.Usuario_lng_Codigo = this.navParams.data;
    let postData = new FormData();
    postData.append('Usuario_lng_Codigo', this.Usuario_lng_Codigo);
    this._http.post<Grupo[]>(
      this._url+"grupo", 
      postData
    ).subscribe(arrObjGrupo => {
      this.arrObjGrupo = arrObjGrupo;
      if(this.arrObjGrupo.length == 0){
        this.alert("Aviso", "Você não faz parte de nenhum grupo!", "OK");
      }
      loading.dismiss();
    },(erro => {
      loading.dismiss();
      this.alert("Falha", "Não foi possível carregar os Grupos. Tente novamente mais tarde!", "OK");
    }))
  }

  private alert(title:string, subtitle:string, textButton:string){
    this._alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [{text: textButton}]
    }).present();
  }

  perfilUsuario(){
    this.navCtrl.push(PerfilPage, this.Usuario_lng_Codigo);
  }

}
