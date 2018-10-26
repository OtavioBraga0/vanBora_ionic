import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/Usuario';
import { AppModule } from '../../app/app.module';
import { AlunoHomePage } from '../aluno-home/aluno-home';
import { MotoristaHomePage } from '../motorista-home/motorista-home';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public oUsuario = <Usuario>{};
  public tipoCadastro;
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _http: HttpClient, 
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
    this.oUsuario.Usuario_chr_Tipo = this.navParams.data;
  }

  ionViewDidLoad() {
    if(this.oUsuario.Usuario_chr_Tipo == 'a'){
      this.tipoCadastro = "Aluno";
    } else {
      this.tipoCadastro = "Motorista";
    }
  }

  cadastro(){
    let loading = this._loadingCtrl.create()
    loading.present();
    let postData = new FormData();
    postData.append('Usuario_vch_Nome', this.oUsuario.Usuario_vch_Nome);
    postData.append('Usuario_dat_DataNascimento', this.oUsuario.Usuario_dat_DataNascimento);
    postData.append('Usuario_vch_Celular', this.oUsuario.Usuario_vch_Celular);
    postData.append('Usuario_vch_Endereco', this.oUsuario.Usuario_vch_Endereco);
    postData.append('Usuario_vch_Numero', this.oUsuario.Usuario_vch_Numero);
    postData.append('Usuario_vch_Complemento', this.oUsuario.Usuario_vch_Complemento);
    postData.append('Usuario_chr_Tipo', this.oUsuario.Usuario_chr_Tipo);
    this._http.post<Usuario[]>(
      this._url + "cadastraUsuario",
      postData
    ).subscribe((retorno) => {
      loading.dismiss();
      this._alertCtrl.create({
        title: "Sucesso",
        subTitle: "Cadastro Efetuado com sucesso",
        buttons: [{text: "OK"}]
      }).present();
      if(this.oUsuario.Usuario_chr_Tipo == 'a'){
        this.navCtrl.setRoot(AlunoHomePage, retorno);
      } else {
        this.navCtrl.setRoot(MotoristaHomePage, retorno);
      }
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
