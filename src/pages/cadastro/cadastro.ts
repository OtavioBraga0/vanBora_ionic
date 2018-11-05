import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/Usuario';
import { AppModule } from '../../app/app.module';
import { AlunoHomePage } from '../aluno-home/aluno-home';
import { MotoristaHomePage } from '../motorista-home/motorista-home';
import { UsuarioProvider } from '../../providers/usuario/usuario';

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
    public navParams: NavParams, private _http: HttpClient, 
    private _loadingCtrl: LoadingController, private _alertCtrl: AlertController,
    private _provider: UsuarioProvider, private _toastCtrl: ToastController) {
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
    let postData = {
      'Usuario_vch_Nome': this.oUsuario.Usuario_vch_Nome,
      'Usuario_dat_DataNascimento': this.oUsuario.Usuario_dat_DataNascimento,
      'Usuario_vch_Celular': this.oUsuario.Usuario_vch_Celular,
      'Usuario_vch_Endereco': this.oUsuario.Usuario_vch_Endereco,
      'Usuario_vch_Numero': this.oUsuario.Usuario_vch_Numero,
      'Usuario_vch_Complemento': this.oUsuario.Usuario_vch_Complemento,
      'Usuario_chr_Tipo': this.oUsuario.Usuario_chr_Tipo
    }

    this._provider.save(postData)
      .then((retorno) => {
        this._toastCtrl.create({message: 'Contato enviado com sucesso.', duration: 3000}).present();
        console.log(retorno)
        // if(this.oUsuario.Usuario_chr_Tipo == 'a'){
        //   this.navCtrl.setRoot(AlunoHomePage, retorno);
        // } else {
        //   this.navCtrl.setRoot(MotoristaHomePage, retorno);
        // }
      })
      .catch((e) => {
        this._toastCtrl.create({message: 'Erro ao salvar o contato', duration: 3000}).present();
        console.error(e);
      });
  }
}