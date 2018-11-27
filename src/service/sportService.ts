import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from './authentification.Service';
import {Addsport} from '../Modele/modele.Sport';


@Injectable()
export class sportService {

  constructor(public https: HttpClient,public authservice:AuthentificationService) {

  }

  getsport() {
    return this.https.get('http://localhost:8080/Sport/List',{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  deleteSport(id:number){
    return this.https.delete('http://localhost:8080/Sport/Delete/'+id,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  saveSport(addSport:Addsport){
    return this.https.post('http://localhost:8080/Sport/Add', addSport,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  onelocalityofsport(id:number){
    return this.https.get('http://localhost:8080/Sport/One/'+id,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  onesport(id:number){
    return this.https.get('http://localhost:8080/Sport/One/'+id,{
      headers: new HttpHeaders({
      'Authorization': this.authservice.loadToken()
      })
       })
  }
  updateSport(addsport:Addsport){
    return this.https.put('http://localhost:8080/Sport/Update/'+addsport.id, addsport,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })

  }
}
