import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Grupo } from '../../modelos/Grupo'
import { AppModule } from '../../app/app.module';
import { PerfilPage } from '../perfil/perfil';
import { Usuario } from '../../modelos/Usuario';

@IonicPage()
@Component({
  selector: 'page-aluno-home',
  templateUrl: 'aluno-home.html',
})
export class AlunoHomePage {
  
  public arrObjGrupo: Grupo[];
  private _url:string = AppModule.getUrl();
  public oUsuario = <Usuario>{};

  public confirmadoChecked;
  public negadoChecked;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: HttpClient, private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) { }

  ionViewDidEnter() {
    this.carregaConteudo();
  }

  private alert(title:string, subtitle:string, textButton:string){
    this._alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [{text: textButton}]
    }).present();
  }

  perfilUsuario(){
    this.navCtrl.push(PerfilPage, this.oUsuario.Usuario_lng_Codigo);
  }

  confirmacao(confirmacao, oGrupo){
    let loading = this._loadingCtrl.create({content: "Enviando Resposta ..."});
    loading.present();
    let postData = new FormData();
    console.log(confirmacao);
    postData.append('Usuario_lng_Codigo', oGrupo.Usuario_lng_Codigo);
    postData.append('Grupo_lng_Codigo', oGrupo.Grupo_lng_Codigo);
    postData.append('Aluno_chr_Confirmacao', confirmacao);
    this._http.post(
      this._url+"editaAluno", 
      postData
    ).subscribe(() => {
      loading.dismiss();
      this.carregaConteudo();
    },(erro => {
      loading.dismiss();
      this.alert("Falha", "Não foi possível enviar sua resposta. Tente novamente mais tarde!", "OK");
    }))
  }

  recarrega(refresher){
    setTimeout(() => {
      this.carregaConteudo();
      refresher.complete();
    }, 2000);
  }

  carregaConteudo(){
    let loading = this._loadingCtrl.create({content: "Carregando Grupos ..."});
    loading.present();
    this.oUsuario.Usuario_lng_Codigo = this.navParams.data;
    let postData = new FormData();
    postData.append('Usuario_lng_Codigo', this.oUsuario.Usuario_lng_Codigo);
    this._http.post<Grupo[]>(
      this._url+"listaGrupoAluno", 
      postData
    ).subscribe(arrObjGrupo => {
      this.arrObjGrupo = arrObjGrupo;
      if(this.arrObjGrupo.length == 0){
        this.alert("Aviso", "Você não faz parte de nenhum grupo!", "OK");
      } else {
        for (let i = 0; i < this.arrObjGrupo.length; i++) {
          if(this.arrObjGrupo[i].Aluno_chr_Confirmacao == 's'){
            this.arrObjGrupo[i].negadoChecked = 'ativo';
          } else if(this.arrObjGrupo[i].Aluno_chr_Confirmacao == 'n') {
            this.arrObjGrupo[i].confirmadoChecked = 'ativo';
          } else {
            this.arrObjGrupo[i].negadoChecked = 'ativo';
            this.arrObjGrupo[i].confirmadoChecked = 'ativo';            
          }
        }
      }
      loading.dismiss();
    },(erro => {
      loading.dismiss();
      this.alert("Falha", "Não foi possível carregar os Grupos. Tente novamente mais tarde!", "OK");
    }))
  }

}
