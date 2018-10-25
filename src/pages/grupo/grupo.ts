import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../../modelos/Aluno';

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  public arrObjAlunos: Aluno[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let Grupo_lng_Codigo = this.navParams.data;
    let loading = this._loadingCtrl.create({content: "<ion-icon name='car'></ion-icon>"})
    loading.present();
    let postData = new FormData();
    postData.append('Grupo_lng_Codigo', Grupo_lng_Codigo);
    this._http.post<Aluno[]>(
      "http://localhost/faculdade/vanBora/alunos",
      postData
    ).subscribe((arrObjAlunos) => {
      this.arrObjAlunos = arrObjAlunos;
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
