import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/Usuario';
import { AppModule } from '../../app/app.module';
import { NovoAlunoPage } from '../novo-aluno/novo-aluno';
import { Grupo } from '../../modelos/Grupo';

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

  public arrObjUsuario: Usuario[];
  public oGrupo = <Grupo>{};
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) {
  }

  // editaGrupo(){
  //   this.navCtrl.push(, this.oGrupo.Usuario_lng_Codigo);
  // }

  ionViewDidEnter() {
    this.carregaConteudo();
  }

  addAluno(){
    this.navCtrl.push(NovoAlunoPage,this.oGrupo.Grupo_lng_Codigo);
  }

  carregaConteudo(){
    this.oGrupo.Grupo_lng_Codigo = this.navParams.data;
    let loading = this._loadingCtrl.create({content: "Carregando lista de Alunos..."})
    loading.present();
    let postData = new FormData();
    postData.append('Grupo_lng_Codigo', this.oGrupo.Grupo_lng_Codigo);
    this._http.post<Usuario[]>(
      this._url + "listaAluno",
      postData
    ).subscribe((arrObjUsuario) => {
      this.arrObjUsuario = arrObjUsuario;
      loading.dismiss();
      if(this.arrObjUsuario.length == 0){
        this._alertCtrl.create({
          title: "Aviso",
          subTitle: "Seu Grupo não tem nenhum integrante!",
          buttons: [{text: "OK"}]
        }).present();
      }
    },(erro) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: "Falha",
        subTitle: "Não foi possível carregar os Alunos. Tente novamente mais tarde!",
        buttons: [{text: "OK"}]
      }).present();
    })
  }

  recarrega(refresher){
    setTimeout(() => {
      this.carregaConteudo();
      refresher.complete();
    }, 2000);
  }

}
