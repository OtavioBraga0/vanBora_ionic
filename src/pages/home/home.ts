import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/Usuario';
import { AppModule } from '../../app/app.module';
import { AlunoHomePage } from '../aluno-home/aluno-home';
import { MotoristaHomePage } from '../motorista-home/motorista-home';
import { NovoUsuarioPage } from '../novo-usuario/novo-usuario';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public oUsuario = <Usuario>{};
  private _url:string = AppModule.getUrl();

  constructor(public navCtrl: NavController, private _http: HttpClient, 
    private _loadingCtrl: LoadingController, private _alertCtrl: AlertController,
    private _deviceId: Device, private _toastCtrl: ToastController) {}

  ionViewDidEnter() {
    this.oUsuario.Usuario_vch_DeviceId = this._deviceId.uuid;
    // this.validaUsuario();

    setTimeout(() => {
      this.navCtrl.setRoot(NovoUsuarioPage);
    }, 3000)
  }

  validaUsuario(){
    let postData = new FormData();
    postData.append('Usuario_vch_DeviceId', this.oUsuario.Usuario_vch_DeviceId);
    this._http.post<Usuario>(
      this._url + "validaUsuario",
      postData
    ).subscribe((oUsuario) => {
      if(oUsuario.Usuario_lng_Codigo != ""){
        if(oUsuario.Usuario_chr_Tipo == 'a'){
          this.navCtrl.setRoot(AlunoHomePage, oUsuario.Usuario_lng_Codigo);
        } else if(oUsuario.Usuario_chr_Tipo == 'm'){
          this.navCtrl.setRoot(MotoristaHomePage, oUsuario.Usuario_lng_Codigo);
        }
      } else {
        this._toastCtrl.create({message: 'Usuário não encontrado. Faça seu cadastro', duration: 3000}).present();
        this.navCtrl.setRoot(NovoUsuarioPage);
      }
      this._alertCtrl.create({
        title: "Falha",
        subTitle: `Usuario: ${oUsuario.Usuario_vch_Nome}`,
        buttons: [{text: "OK"}]
      });
    },(erro) => {
      console.log(erro.error.text)
      this._toastCtrl.create({message: 'Erro ao procurar usuario. Tente novamente!', duration: 3000}).present();
      // this.validaUsuario();
      // this.navCtrl.setRoot(NovoUsuarioPage);
    })
  }

  
}
