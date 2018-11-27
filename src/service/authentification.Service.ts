import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthentificationService {
  private host: string='http://localhost:8080';
  private roles:Array<any>= new Array<any>();

  constructor(private http:HttpClient){}
  login(user){
    return this.http.post(this.host+'/login',user,{observe:'response'});
  }
  saveToken(jwt:string){
    localStorage.setItem('token',jwt); //sauvegarder le token


    //pour gerer etre admin ou pas
    const jwtHelper = new JwtHelperService();
    this.roles=jwtHelper.decodeToken(this.loadToken()).roles
  }
  loadToken(){
    return localStorage.getItem('token');


  }
  logout(){

    localStorage.removeItem('token');
  }
  isAdmin(){

    for(let r of this.roles){
      if(r.authority=='ADMIN') return true;
    }
    return false;
  }

}
