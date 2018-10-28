import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MotoristaHomePage } from '../pages/motorista-home/motorista-home';
import { AlunoHomePage } from '../pages/aluno-home/aluno-home';
import { GrupoPage } from '../pages/grupo/grupo';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';
import { NovoGrupoPage } from '../pages/novo-grupo/novo-grupo';
import { NovoAlunoPage } from '../pages/novo-aluno/novo-aluno';

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
    NovoAlunoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
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
    NovoAlunoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  private static url: string = "http://localhost/faculdade/vanBora_webservice/";
  
  static getUrl(){
    return this.url;
  }
}
