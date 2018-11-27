import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Addlieu} from '../Modele/modele.Lieu';
import {AuthentificationService} from './authentification.Service';

@Injectable()
export class lieuService {

  constructor(public https: HttpClient,public authservice:AuthentificationService) {

  }

  getlieu() {
    return this.https.get("http://localhost:8080/Locality/List",{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  saveLieu(addLieu:Addlieu){  //dans modele

    return this.https.post('http://localhost:8080/Locality/Add',addLieu,
      {headers:new HttpHeaders({'Authorization': this.authservice.loadToken()})}
      )
}
}
