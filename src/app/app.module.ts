import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrMaskerModule } from 'brmasker-ionic-3';
// import { Device } from '@ionic-native/device'

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
    // Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
  private static url: string = "http://localhost/faculdade/vanBora_webservice/";
  
  static getUrl(){
    return this.url;
  }
}