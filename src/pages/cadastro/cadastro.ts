import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/Usuario';
import { AppModule } from '../../app/app.module';
import { AlunoHomePage } from '../aluno-home/aluno-home';
import { MotoristaHomePage } from '../motorista-home/motorista-home';
import { Device } from '@ionic-native/device';

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
    private _loadingCtrl: LoadingController, private _toastCtrl: ToastController,
    private _deviceId: Device, private _alertCtrl: AlertController) {
    this.oUsuario.Usuario_chr_Tipo = this.navParams.data;
  }

  ionViewDidLoad() {
    if(this.oUsuario.Usuario_chr_Tipo == 'a'){
      this.tipoCadastro = "Aluno";
    } else {
      this.tipoCadastro = "Motorista";
    }

    this.oUsuario.Usuario_vch_DeviceId = this._deviceId.uuid;
  }

  cadastro(){
    let loading = this._loadingCtrl.create();
    loading.present();
    let postData = new FormData();
    postData.append('Usuario_vch_Nome', this.oUsuario.Usuario_vch_Nome);
    postData.append('Usuario_dat_DataNascimento', this.oUsuario.Usuario_dat_DataNascimento);
    postData.append('Usuario_vch_Celular', this.oUsuario.Usuario_vch_Celular);
    postData.append('Usuario_vch_Endereco', this.oUsuario.Usuario_vch_Endereco);
    postData.append('Usuario_vch_Numero', this.oUsuario.Usuario_vch_Numero);
    postData.append('Usuario_vch_Complemento', this.oUsuario.Usuario_vch_Complemento);
    postData.append('Usuario_chr_Tipo', this.oUsuario.Usuario_chr_Tipo);
    postData.append('Usuario_vch_DeviceId', this.oUsuario.Usuario_vch_DeviceId);

    this._http.post(
      this._url + "salvaUsuario",
      postData
    ).subscribe((retorno) => {
      loading.dismiss();
      console.log(retorno);
      this._toastCtrl.create({message: 'Cadastro efetuado com sucesso.', duration: 3000}).present();
      if(this.oUsuario.Usuario_chr_Tipo == 'a'){
        this.navCtrl.setRoot(AlunoHomePage, retorno);
      } else {
        this.navCtrl.setRoot(MotoristaHomePage, retorno);
      }
    },(erro) => {
      loading.dismiss();
      this._alertCtrl.create(
        {
          title: "POST DATA", 
          message: `erro: ${erro.message}` 
        }).present();
      this._toastCtrl.create({message: 'Erro ao efetuar o cadastro.', duration: 3000}).present();
    })
  }
}