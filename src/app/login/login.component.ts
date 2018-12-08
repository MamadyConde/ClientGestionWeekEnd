import { Component, OnInit } from '@angular/core';
import { AuthentificationService} from '../../service/authentification.Service';
import {Router} from '@angular/router';
import {personService} from '../../service/personService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode:number=0;
  pageLogin:any;
  constructor(private authService:AuthentificationService,private router:Router,public personService:personService) { }

  ngOnInit() {
  }
  onLogin(user){

    this.authService.login(user)
      .subscribe(resp=>{
          let jwt=resp.headers.get('authorization');
          console.log("jwt ",jwt)
          this.authService.saveToken(jwt);
          this.personService.recup(user.email)
          .subscribe( (data:any)=>{
            this.pageLogin=data.roles

            for (var i in this.pageLogin) {
              console.log(" tete ",this.pageLogin[i].roleName);
              if (this.pageLogin[i].roleName=="ADMIN") {
                this.router.navigateByUrl('/person')
                return;
              }else {

                this.router.navigate(['detailPerson',data.id]);
              }
            }
            console.log(" hors for ",this.pageLogin[i].roleName);
          })

        },
        err=>{
          this.mode=1;
        }
      )
  }

}
