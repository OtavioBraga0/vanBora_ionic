import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Grupo } from '../../modelos/Grupo';
import { GrupoPage } from '../grupo/grupo';
import { AppModule } from '../../app/app.module';
import { NovoGrupoPage } from '../novo-grupo/novo-grupo';
import { Usuario } from '../../modelos/Usuario';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-motorista-home',
  templateUrl: 'motorista-home.html',
})
export class MotoristaHomePage {

  public arrObjGrupo;
  public oGrupo: Grupo;
  private _url:string = AppModule.getUrl();
  public oUsuario = <Usuario>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) {
  }

  perfilUsuario(){
    this.navCtrl.push(PerfilPage, this.oUsuario.Usuario_lng_Codigo);
  }

  ionViewDidEnter(){
    this.carregaConteudo();
  }

  selecionaGrupo(Grupo_lng_Codigo){
    this.navCtrl.push(GrupoPage, Grupo_lng_Codigo);
  }

  criaGrupo(){
    this.navCtrl.push(NovoGrupoPage, this.oUsuario.Usuario_lng_Codigo);    
  }

  carregaConteudo(){
    let loading = this._loadingCtrl.create({content: "Carregando Grupos ..."});
    loading.present();
    this.oUsuario.Usuario_lng_Codigo = this.navParams.data;
    let postData = new FormData();
    postData.append('Usuario_lng_Codigo', this.oUsuario.Usuario_lng_Codigo);
    this._http.post<Grupo[]>(
      this._url + "listaGrupoMotorista", 
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

  recarrega(refresher){
    setTimeout(() => {
      this.carregaConteudo();
      refresher.complete();
    }, 2000);
  }

}
