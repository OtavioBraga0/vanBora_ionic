import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelos/Usuario';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '../../app/app.module';
import { AlunoHomePage } from '../aluno-home/aluno-home';
import { MotoristaHomePage } from '../motorista-home/motorista-home';
import { CadastroPage } from '../cadastro/cadastro';


@IonicPage()
@Component({
  selector: 'page-novo-usuario',
  templateUrl: 'novo-usuario.html',
})
export class NovoUsuarioPage {

  public oUsuario = <Usuario>{};
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _loadingCtrl: LoadingController, private _alertCtrl: AlertController,
    private _http: HttpClient) {
  }

  validaUsuario(){
    let loading = this._loadingCtrl.create()
    loading.present();
    let postData = new FormData();
    postData.append('Usuario_vch_Celular', this.oUsuario.Usuario_vch_Celular);
    // console.log(this.oUsuario.Usuario_vch_Celular);
    this._http.post<Usuario>(
      this._url + "validaUsuario",
      postData
    ).subscribe((oUsuario) => {
      loading.dismiss();
      if(oUsuario.Usuario_lng_Codigo != ""){
        if(oUsuario.Usuario_chr_Tipo == 'a'){
          this.navCtrl.setRoot(AlunoHomePage, oUsuario.Usuario_lng_Codigo);
        } else {
          this.navCtrl.setRoot(MotoristaHomePage, oUsuario.Usuario_lng_Codigo);
        }
      } else {
        this._alertCtrl.create({
          title: "Falha",
          subTitle: "Usuário não encontrado. Faça seu cadastro!",
          buttons: [{text: "OK"}]
        }).present();
      }
    },(erro) => {
      loading.dismiss();
      console.log(erro)
      this._alertCtrl.create({
        title: "Falha",
        subTitle: "Não foi possível efetuar a validação. Tente novamente mais tarde!",
        buttons: [{text: "OK"}]
      }).present();
    })
  }

  selecionaHomeAluno(){
    this.navCtrl.push(CadastroPage, "a");
  }

  selecionaHomeMotorista(){
    this.navCtrl.push(CadastroPage, "m");
  }

}
