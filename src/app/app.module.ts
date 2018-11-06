import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { Sim } from '@ionic-native/sim';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MotoristaHomePage } from '../pages/motorista-home/motorista-home';
import { AlunoHomePage } from '../pages/aluno-home/aluno-home';
import { GrupoPage } from '../pages/grupo/grupo';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';
import { NovoGrupoPage } from '../pages/novo-grupo/novo-grupo';
import { NovoAlunoPage } from '../pages/novo-aluno/novo-aluno';
import { PerfilGrupoPage } from '../pages/perfil-grupo/perfil-grupo';
import { NovoUsuarioPage } from '../pages/novo-usuario/novo-usuario';
import { GrupoProvider } from '../providers/grupo/grupo';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MotoristaHomePage,
    AlunoHomePage,
    GrupoPage,
    CadastroPage,
    PerfilPage,
    NovoGrupoPage,
    NovoAlunoPage,
    PerfilGrupoPage,
    NovoUsuarioPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrMaskerModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDC_t6RQkidjPH85FXUbWTU1qFW7TGePBo",
      authDomain: "vanbora-94c4c.firebaseapp.com",
      databaseURL: "https://vanbora-94c4c.firebaseio.com",
      projectId: "vanbora-94c4c",
      storageBucket: "vanbora-94c4c.appspot.com",
      messagingSenderId: "27382594979"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MotoristaHomePage,
    AlunoHomePage,
    GrupoPage,
    CadastroPage,
    PerfilPage,
    NovoGrupoPage,
    NovoAlunoPage,
    PerfilGrupoPage,
    NovoUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Sim,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GrupoProvider,
    UsuarioProvider
  ]
})
export class AppModule {
  private static url: string = "http://192.168.43.78:8090/faculdade/vanBora_webservice/";
  
  static getUrl(){
    return this.url;
  }
}