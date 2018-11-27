import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../service/authentification.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientGestionWeekEnd';

  constructor(public authService: AuthentificationService,private router:Router){}
  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
