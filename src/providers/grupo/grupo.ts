import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class GrupoProvider {
  private PATH = 'grupo/'

  constructor(private firebase: AngularFireDatabase) { }

  getAll(){
    return this.firebase.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(grupo => ({ key: grupo.payload.key, ...grupo.payload.val() }))
      })
  }

  get(key: string){
    return this.firebase.object(this.PATH)
      .snapshotChanges()
      .map(grupo => {
        return {key: grupo.payload.key, ...grupo.payload.val()}
      })
  }

  save(grupo: any){
    return new Promise((resolve, reject) => {
      if(grupo.key){
        this.firebase.list(this.PATH)
          .update(grupo.key, { name: grupo.name, tel: grupo.tel })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.firebase.list(this.PATH)
          .push({ name: grupo.name, tel: grupo.tel })
          .then(() => resolve())
      }
    })
  }

  remove(key: string){
    return this.firebase.list(this.PATH).remove(key);
  }
}
