import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/Usuario';
import { AppModule } from '../../app/app.module';

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  public arrObjAluno: Usuario[];
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let Grupo_lng_Codigo = this.navParams.data;
    let loading = this._loadingCtrl.create({content: "<ion-icon name='car'></ion-icon>"})
    loading.present();
    let postData = new FormData();
    postData.append('Grupo_lng_Codigo', Grupo_lng_Codigo);
    this._http.post<Usuario[]>(
      this._url + "aluno",
      postData
    ).subscribe((arrObjAluno) => {
      this.arrObjAluno = arrObjAluno;
      loading.dismiss();
    },(erro) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: "Falha",
        subTitle: "Não foi possível carregar os Alunos. Tente novamente mais tarde!",
        buttons: [{text: "OK"}]
      }).present();
    })
  }

}
