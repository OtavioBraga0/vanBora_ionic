import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '../../app/app.module';
import { Grupo } from '../../modelos/Grupo';

@IonicPage()
@Component({
  selector: 'page-novo-grupo',
  templateUrl: 'novo-grupo.html',
})
export class NovoGrupoPage {

  public oGrupo =  <Grupo>{};
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController, private _http: HttpClient, private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
  }

  cadastro(){
    this.oGrupo.Usuario_lng_Codigo = this.navParams.data;
    let loading = this._loadingCtrl.create();
    loading.present();
    let postData = new FormData();
    postData.append('Grupo_vch_Nome', this.oGrupo.Grupo_vch_Nome);
    postData.append('Grupo_vch_Horario', this.oGrupo.Grupo_vch_Horario);
    postData.append('Usuario_lng_Codigo', this.oGrupo.Usuario_lng_Codigo);
    postData.append('Periodo_lng_Codigo', this.oGrupo.Periodo_lng_Codigo);
    this._http.post(
      this._url + "salvaGrupo",
      postData
    ).subscribe((retorno) => {
      loading.dismiss();
      console.log(retorno);
      this._alertCtrl.create({
        title: "Sucesso",
        subTitle: "Cadastro Efetuado com sucesso",
        buttons: [{text: "OK"}]
      }).present();
      this.navCtrl.popToRoot()
    },(erro) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: "Falha",
        subTitle: "Não foi possível efetuar o cadastro. Tente novamente mais tarde!",
        buttons: [{text: "OK"}]
      }).present();
    })
  }

}
