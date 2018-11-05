import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Usuario } from '../../modelos/Usuario';

@Injectable()
export class UsuarioProvider {

  private PATH = 'usuario/'

  constructor(private firebase: AngularFireDatabase) { }

  getAll(){
    return this.firebase.list(this.PATH)
      .snapshotChanges()
      .map(arrObjUsuario => {
        return arrObjUsuario.map(oUsuario => ({ 
          Usuario_lng_Codigo: oUsuario.payload.key, ...oUsuario.payload.val() }))
      })
  }

  get(Usuario_lng_Codigo: string){
    return this.firebase.object(this.PATH)
      .snapshotChanges()
      .map(oUsuario => {
        return {Usuario_lng_Codigo: oUsuario.payload.key, ...oUsuario.payload.val()}
      })
  }

  save(oUsuario: any){
    return new Promise((resolve, reject) => {
      if(oUsuario.Usuario_lng_Codigo){
        this.firebase.list(this.PATH)
          .update(
            oUsuario.Usuario_lng_Codigo, 
            { 
              Usuario_vch_Nome: oUsuario.Usuario_vch_Nome, 
              Usuario_dat_DataNascimento: oUsuario.Usuario_dat_DataNascimento, 
              Usuario_vch_Endereco: oUsuario.Usuario_vch_Endereco,
              Usuario_vch_Numero: oUsuario.Usuario_vch_Numero,
              Usuario_vch_Complemento: oUsuario.Usuario_vch_Complemento,
              Usuario_vch_Celular: oUsuario.Usuario_vch_Celular,
              Usuario_chr_Tipo: oUsuario.Usuario_chr_Tipo
            }
          )
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.firebase.list(this.PATH)
          .push({ 
            Usuario_vch_Nome: oUsuario.Usuario_vch_Nome, 
            Usuario_dat_DataNascimento: oUsuario.Usuario_dat_DataNascimento, 
            Usuario_vch_Endereco: oUsuario.Usuario_vch_Endereco,
            Usuario_vch_Numero: oUsuario.Usuario_vch_Numero,
            Usuario_vch_Complemento: oUsuario.Usuario_vch_Complemento,
            Usuario_vch_Celular: oUsuario.Usuario_vch_Celular,
            Usuario_chr_Tipo: oUsuario.Usuario_chr_Tipo 
          }).key
          // .then(() => resolve())
      }
    })
  }

  remove(Usuario_lng_Codigo: string){
    return this.firebase.list(this.PATH).remove(Usuario_lng_Codigo);
  }

}
