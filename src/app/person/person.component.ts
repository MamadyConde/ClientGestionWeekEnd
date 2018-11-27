import { Component, OnInit } from '@angular/core';

import {personService} from '../../service/personService';
import {Router} from '@angular/router';
import {Addperson} from '../../Modele/modele.Person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  pagePerson:any;
  constructor(public personService:personService,private router:Router) { }

  ngOnInit() {
      this.personService.getperson()
        .subscribe(data=>{
          this.pagePerson=data;
        },err=>{
          console.log(err);
          this.router.navigateByUrl('/login')
        })
  }
  onEditPerson(id:number){
    this.router.navigate(['editPerson',id]);  //remplace routerlink
  }
  onDetailPerson(id:number){
    this.router.navigate(['detailPerson',id]);  //remplace routerlink
  }
  onDeletePerson(c:Addperson){
    let confirm = window.confirm("Êtes-Vous sûr?")
    if(confirm == true){
      //  alert(c.id);
      this.personService.deletePerson(c.id)
        .subscribe(data=>{
          // alert("element supprimé")
          this.pagePerson.splice(  //pour eliminer dans la liste
            this.pagePerson.indexOf(c),1);

        },err=>{
          console.log(err);
        })
    }

  }

}
