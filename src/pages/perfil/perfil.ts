import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelos/Usuario';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '../../app/app.module';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private oUsuario = <Usuario>{};
  private Usuario_lng_Codigo;
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController, private _http: HttpClient, private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({content: "Carregando Perfil ..."});
    loading.present();
    this.Usuario_lng_Codigo = this.navParams.data;
    let postData = new FormData();
    postData.append('Usuario_lng_Codigo', this.Usuario_lng_Codigo);
    this._http.post<Usuario>(
      this._url+"listaUsuario", 
      postData
    ).subscribe(oUsuario => {
      this.oUsuario = oUsuario;
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
    postData.append('Usuario_lng_Codigo', this.Usuario_lng_Codigo);
    postData.append('Usuario_vch_Nome', this.oUsuario.Usuario_vch_Nome);
    postData.append('Usuario_dat_DataNascimento', this.oUsuario.Usuario_dat_DataNascimento);
    postData.append('Usuario_vch_Celular', this.oUsuario.Usuario_vch_Celular);
    postData.append('Usuario_vch_Endereco', this.oUsuario.Usuario_vch_Endereco);
    postData.append('Usuario_vch_Numero', this.oUsuario.Usuario_vch_Numero);
    postData.append('Usuario_vch_Complemento', this.oUsuario.Usuario_vch_Complemento);
    postData.append('Usuario_chr_Tipo', this.oUsuario.Usuario_chr_Tipo);
    console.log(postData);
    this._http.post<Usuario>(
      this._url+"editaUsuario", 
      postData
    ).subscribe(() => {
      loading.dismiss();
      this.alert("Sucesso","Perfil editado com sucesso","OK");
    },(erro => {
      loading.dismiss();
      this.alert("Falha", "Não foi possível atualizar seu Perfil. Tente novamente mais tarde!", "OK");
    }))
  }

}
