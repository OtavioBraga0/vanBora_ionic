import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Grupo } from '../../modelos/Grupo';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '../../app/app.module';

@IonicPage()
@Component({
  selector: 'page-perfil-grupo',
  templateUrl: 'perfil-grupo.html',
})
export class PerfilGrupoPage {

  public oGrupo = <Grupo>{};
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _loadingCtrl: LoadingController, private _http: HttpClient,
    private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() { 
    let loading = this._loadingCtrl.create({content: "Carregando Perfil ..."});
    loading.present();
    this.oGrupo.Grupo_lng_Codigo = this.navParams.data;
    let postData = new FormData();
    postData.append('Grupo_lng_Codigo', this.oGrupo.Grupo_lng_Codigo);
    this._http.post<Grupo>(
      this._url+"listaGrupo", 
      postData
    ).subscribe(oGrupo => {
      this.oGrupo = oGrupo;
      loading.dismiss();
    },(erro => {
      loading.dismiss();
      this.alert("Falha", "Não foi possível carregar seu Perfil. Tente novamente mais tarde!", "OK");
    }))
  }

  private alert(title:string, subtitle:string, textButton:string){
    this._alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [{text: textButton}]
    }).present();
  }

  edita(){
    let loading = this._loadingCtrl.create({content: "Editando Perfil..."});
    let postData = new FormData();
    postData.append('Grupo_lng_Codigo', this.oGrupo.Grupo_lng_Codigo);
    postData.append('Grupo_vch_Nome', this.oGrupo.Grupo_vch_Nome);
    postData.append('Grupo_vch_Horario', this.oGrupo.Grupo_vch_Horario);
    postData.append('Periodo_lng_Codigo', this.oGrupo.Periodo_lng_Codigo);
    this._http.post(
      this._url+"editaGrupo", 
      postData
    ).subscribe((retorno) => {
      console.log(retorno);
      loading.dismiss();      
      this.alert("Sucesso","Perfil editado com sucesso","OK");
      this.navCtrl.pop();
    },(erro => {
      loading.dismiss();
      this.alert("Falha", "Não foi possível atualizar seu Perfil. Tente novamente mais tarde!", "OK");
    }))
  }

  exclui(){
    let loading = this._loadingCtrl.create({content: "Excluindo Grupo..."});
    let postData = new FormData();
    postData.append('Grupo_lng_Codigo', this.oGrupo.Grupo_lng_Codigo);
    this._http.post(
      this._url+"excluiGrupo", 
      postData
    ).subscribe((retorno) => {
      console.log(retorno);
      loading.dismiss();      
      this.navCtrl.popToRoot();
    },(erro => {
      loading.dismiss();
      this.alert("Falha", "Não foi possível excluir seu Grupo. Tente novamente mais tarde!", "OK");
    }))
  }

}
