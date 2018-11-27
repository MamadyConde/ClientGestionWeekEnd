import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthentificationService} from './authentification.Service';
import {Addperson} from '../Modele/modele.Person';

@Injectable()
export class personService {
  private host = 'http://localhost:8080';
  private jwtToken;


  constructor(public https: HttpClient, private authservice: AuthentificationService) {
  }
  getperson(){

    if(this.jwtToken==null) this.authservice.loadToken();

    return this.https.get(this.host+'/Person/List',{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  oneperson(id:number){
    return this.https.get('http://localhost:8080/Person/One/'+id,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  deletePerson(id:number) {
    return this.https.delete('http://localhost:8080/Person/Delete/'+id,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  updatePerson(addPerson:Addperson){
    return this.https.put('http://localhost:8080/Person/Update/'+addPerson.id, addPerson,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  savePerson(addPerson:Addperson){
    return this.https.post('http://localhost:8080/Person/Add', addPerson,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }
  recup(email:string){
    return this.https.get(this.host+'/Person/Chercher/'+email,{
      headers: new HttpHeaders({
        'Authorization': this.authservice.loadToken()
      })
    })
  }

}
