import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/Usuario';
import { AppModule } from '../../app/app.module';
import { AlunoHomePage } from '../aluno-home/aluno-home';
import { MotoristaHomePage } from '../motorista-home/motorista-home';
import { Sim } from '@ionic-native/sim';
import { NovoUsuarioPage } from '../novo-usuario/novo-usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public oUsuario = <Usuario>{};
  private _url:string = AppModule.getUrl();
  public simInfo: any;
  public cards: any;  
  public ddd;
  public number1;
  public number2;

  constructor(public navCtrl: NavController, private _http: HttpClient, 
    private _loadingCtrl: LoadingController, private _alertCtrl: AlertController,
    private _sim: Sim) {}

  ionViewDidLoad() {
    // this.getSimData();
    setTimeout(()=>{
      this.navCtrl.setRoot(NovoUsuarioPage);
    }, 2000)
  }

  async getSimData() {
    try {
      let simPermission = await this._sim.requestReadPermission();
      if (simPermission == "OK") {
        let simData = await this._sim.getSimInfo();
        this.cards = simData.cards;
        this.ddd = this.cards[0].phoneNumber.substring(3,5);
        this.number1 = this.cards[0].phoneNumber.substring(5,10);
        this.number2 = this.cards[0].phoneNumber.substring(10);
        this.oUsuario.Usuario_vch_Celular = "("+this.ddd+") "+this.number1+"-"+this.number2;

        this.validaUsuario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  validaUsuario(){
    let loading = this._loadingCtrl.create()
    loading.present();
    let postData = new FormData();
    postData.append('Usuario_vch_Celular', this.oUsuario.Usuario_vch_Celular);
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

  
}
