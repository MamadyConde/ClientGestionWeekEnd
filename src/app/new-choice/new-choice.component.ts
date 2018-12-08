import { Component, OnInit } from '@angular/core';
import {Addperson} from '../../Modele/modele.Person';
import {lieuService} from '../../service/lieuService';
import {sportService} from '../../service/sportService';
import {ActivatedRoute, Router} from '@angular/router';
import {personService} from '../../service/personService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-new-choice',
  templateUrl: './new-choice.component.html',
  styleUrls: ['./new-choice.component.css']
})
export class NewChoiceComponent implements OnInit {
  mode: number = 1;
  addperson: Addperson = new Addperson();
  pageLieu: any;
  pageSport: any;
  idPerson: number;
  currentSportlocalityList:any;
  currentListSport:any;
  currentListLocality:any;
  recupSport:any=[];
  recupLocality:any=[];


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
          console.log(this.addperson)
        }, err => {
          console.log(err);
        }
      );

    this.Formeditperson = this.formBuilder.group({
      id: [this.idPerson],
      firstname: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      lastname: ['',Validators.compose([Validators.required,Validators.minLength(1)])],
      email: ['', [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      password:[],
      sports: [ ''],
      locality: [ ''],
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
  updateChoice() {
    console.log("eeee",this.addperson.sports)
    console.log(" form ",this.Formeditperson.value)
    console.log(" did ",this.idPerson)
    this.personService.oneperson(this.idPerson)
      .subscribe((sportList:any) => {
          this.currentListSport = sportList.sports;
          this.currentListLocality = sportList.locality;

          console.log("list sport recu ",this.currentListSport)
          console.log("list locality recup ", this.currentListLocality)

          console.log("long sport",this.currentListSport.length)
          console.log("long Loc ",this.currentListLocality.length)

          for(var i = 0;i<this.currentListSport.length;i++) {
            //for (var i in this.currentListSport){
            //console.log("totot ",this.currentListSport[i].id)

            this.recupSport.push(this.currentListSport[i].id)
            console.log("recup spofin", this.recupSport)
            console.log(" compare celui du form ", this.Formeditperson.value.sports)

            for (var l = 0; l < this.currentListLocality.length; l++) {
             // console.log("long ", this.currentListLocality.length)
              // for (var l in this.currentListLocality) {
              this.recupLocality.push(this.currentListLocality[l].id)
              console.log("recup loca fin ", this.recupLocality)
              console.log(" voir2222 loc ", this.Formeditperson.value.locality)

/*
              if (this.recupSport.length == 0) {
                this.recupSport.push(this.currentListSport[i].id)
              } else {

              for (var v = 0; v <this.recupSport.length; v++) {
                console.log("value ", v)
                if (v != this.currentListSport[i].id) {
                  this.recupSport.push(this.currentListSport[i].id)
                }
              }
            }*/


            }
          }

              let missingSport = this.Formeditperson.value.sports.filter(item => this.recupSport.indexOf(item) < 0);
              console.log("missing ", missingSport);
              if (missingSport.length > 0) {

                var ensSport = this.recupSport.concat(this.Formeditperson.value.sports)
                console.log("concat sport ", ensSport)

                var ensLocality = this.recupLocality.concat(this.Formeditperson.value.locality)
                console.log("concat locality ", ensLocality)


                const sportId = ensSport.map(items => Object.assign({id: items}));
                this.Formeditperson.value.sports = sportId;

                console.log("final sport ", this.Formeditperson.value.sports)

                const lieuId = ensLocality.map(item => Object.assign({id: item}));
                this.Formeditperson.value.locality = lieuId;
                console.log(" final Lieu ", this.Formeditperson.value.locality)

                console.log(" per env ", this.Formeditperson.value)

                this.personService.updatePerson(this.Formeditperson.value)
                  .subscribe((data:any) => {
                      alert('Nouveau Sport ajouté');
                      this.router.navigate(['detailPerson',data.id]);
                    }, err => {
                      console.log(err);
                      alert('problème');
                    }
                  );


              } else {
                this.mode = 2
              }

/*            }
          }*/
        }, err => {
          console.log(err);
        }
      );

  }

}
