import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Aluno } from '../../modelos/Aluno';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '../../app/app.module';
import { Usuario } from '../../modelos/Usuario';

@IonicPage()
@Component({
  selector: 'page-novo-aluno',
  templateUrl: 'novo-aluno.html',
})
export class NovoAlunoPage {

  public oAluno = <Aluno>{};
  public oUsuario = <Usuario>{};
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController, private _http: HttpClient) {
  }

  ionViewDidLoad() {
    
  }

  cadastrar(){
    this.oAluno.Grupo_lng_Codigo = this.navParams.data;
    let loading = this._loadingCtrl.create();
    loading.present();
    let postData = new FormData();
    postData.append('Usuario_vch_Celular', this.oUsuario.Usuario_vch_Celular);
    postData.append('Grupo_lng_Codigo', this.oAluno.Grupo_lng_Codigo);
    this._http.post(
      this._url + "salvaAluno",
      postData
    ).subscribe((retorno) => {
      loading.dismiss();
      console.log(retorno);
      this._alertCtrl.create({
        title: "Sucesso",
        subTitle: "Aluno Cadastrado",
        buttons: [{text: "OK"}]
      }).present();
      this.navCtrl.pop();
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
