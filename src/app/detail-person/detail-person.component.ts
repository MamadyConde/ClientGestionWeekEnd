import { Component, OnInit } from '@angular/core';
import {Addperson} from '../../Modele/modele.Person';
import {ActivatedRoute, Router} from '@angular/router';
import {sportService} from '../../service/sportService';
import {lieuService} from '../../service/lieuService';
import {personService} from '../../service/personService';

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.css']
})
export class DetailPersonComponent implements OnInit {
  mode: number = 1;
  pagePerson:any;
  addperson: Addperson = new Addperson();
  pageLieu: any;
  pageSport: any;
  idPerson: number;
  emailperson:string;

  constructor(public lieuService: lieuService, public sportService: sportService,
              public activaterRoute: ActivatedRoute, public personService: personService,
              public router: Router) {
    this.idPerson = activaterRoute.snapshot.params['id'];


  }

  ngOnInit() {
    this.personService.getperson()
      .subscribe(data =>{
          console.log("data", data)
          this.pagePerson=data;
        },err=>{
          console.log(err);
        }
      );

    this.lieuService.getlieu()
      .subscribe(data => {
          this.pageLieu = data;
        }, err => {
          console.log(err);
        }
      );

    this.sportService.getsport()
      .subscribe(data => {
        console.log('datta ', data);
        this.pageSport = data;
      }, err => {

      });

    this.personService.oneperson(this.idPerson)
      .subscribe((data:any) => {
          this.addperson = data;
        }, err => {
          console.log(err);
        }
      );
  }
  onNewChoice(id:number){
    this.router.navigate(['newChoice',id]);  //remplace routerlink

  }
  onEditPerson(id:number){
    this.router.navigate(['editPerson',id]);  //remplace routerlink
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
          this.router.navigate(['person']);
        },err=>{
          console.log(err);
        })
    }

  }

}
