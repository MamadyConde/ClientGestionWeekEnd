import { Component, OnInit } from '@angular/core';
import {Addperson} from '../../Modele/modele.Person';
import {lieuService} from '../../service/lieuService';
import {sportService} from '../../service/sportService';
import {ActivatedRoute, Router} from '@angular/router';
import {personService} from '../../service/personService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  mode: number = 1;
  addperson: Addperson = new Addperson();
  pageLieu: any;
  pageSport: any;
  idPerson: number;
  currentSportlocalityList:any;


  get f() {
    return this.Formeditperson.controls;
  }
  constructor(public lieuService: lieuService, public sportService: sportService,
              public activaterRoute: ActivatedRoute, public personService: personService,
              public router: Router,private formBuilder: FormBuilder) {
    this.idPerson = activaterRoute.snapshot.params['id'];

  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  Formeditperson: FormGroup


  ngOnInit() {
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

    this.Formeditperson = this.formBuilder.group({
      id: [this.idPerson],
      firstname: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      lastname: ['',Validators.compose([Validators.required,Validators.minLength(1)])],
      email: ['', [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      password:['',Validators.required],
      sports: [ '',Validators.required],
      locality: [ '',Validators.required],
    });

    this.f.sports.valueChanges.subscribe(val => {
      this.sportService.onelocalityofsport(val as number).subscribe(
        (localityList:any) => {
          this.currentSportlocalityList = localityList.locality;
          console.log("lieusport ",this.currentSportlocalityList)
        }
      );
    })

  }
  updatePerson() {
    console.log("eeee",this.Formeditperson.value)
    const lieuId = this.Formeditperson.value.locality.map(item=>Object.assign({id:item}));
    this.Formeditperson.value.locality = lieuId;
    //this.Formeditperson.value.sports = [{id: this.Formeditperson.value.sports}];
    const sportId = this.Formeditperson.value.sports.map(items=>Object.assign({id:items}));
    this.Formeditperson.value.sports = sportId;



    this.personService.updatePerson(this.Formeditperson.value)
      .subscribe((data:any) => {
          alert('Modification effectuée');
          this.router.navigate(['detailPerson',data.id]);
        }, err => {
          console.log(err);
          alert('problème');
        }
      );
  }

}
