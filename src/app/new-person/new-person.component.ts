import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {personService} from '../../service/personService';
import {sportService} from '../../service/sportService';
import {lieuService} from '../../service/lieuService';
import {Router} from '@angular/router';
import {Addperson} from '../../Modele/modele.Person';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  addperson:Addperson=new Addperson();
  mode:number=1;
  pageLieu:any;
  pageSport:any;
  //sportId:any;
  currentSportplacesList:any;

  get f() {
    return this.Formaddperson.controls;
  }
  constructor(private formBuilder: FormBuilder, public personService:personService,
              public sportService:sportService, public lieuService:lieuService,
              public router: Router) { }

  Formaddperson: FormGroup
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit() {
    this.lieuService.getlieu()
      .subscribe(data =>{
          this.pageLieu=data;
        },err=>{
          console.log(err);
        }
      );
    this.sportService.getsport()
      .subscribe(data=>{
        console.log("datta ",data)
        this.pageSport=data;
      },err=>{

      });
    this.Formaddperson = this.formBuilder.group({
      id: [],
      firstname: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      lastname: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      email: ['', [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      password:['',Validators.required],
      sports: [ '',Validators.required],
      locality: [ '',Validators.required],
    });
    this.f.sports.valueChanges.subscribe(val => {
      this.sportService.onelocalityofsport(val as number)
        .subscribe((data:any)=>{
          this.currentSportplacesList =data.locality;
        })

    })


  }

  savePerson(){
     console.log(this.addperson);

    const lieuId = this.Formaddperson.value.locality.map(item=>Object.assign({id:item}));
    this.Formaddperson.value.locality = lieuId;
    this.Formaddperson.value.sports = [{id: this.Formaddperson.value.sports}];


    this.personService.savePerson(this.Formaddperson.value)
      .subscribe((data:any)=>{
          console.log(data.id)
          if (data.id==null){
            this.mode=2;
          }
          this.router.navigate(['person']);
        },err=>{

        }
      )
  }

}
