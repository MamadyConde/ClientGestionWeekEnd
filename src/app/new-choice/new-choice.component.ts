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

    this.personService.oneperson(this.idPerson)
      .subscribe((sportList:any) => {
          this.currentListSport = sportList.sports;
          this.currentListLocality = sportList.locality;


          for(var i = 0;i<this.currentListSport.length;i++) {

            this.recupSport.push(this.currentListSport[i].id)

            for (var l = 0; l < this.currentListLocality.length; l++) {
              this.recupLocality.push(this.currentListLocality[l].id)

            }
          }

              let missingSport = this.Formeditperson.value.sports.filter(item => this.recupSport.indexOf(item) < 0);
              if (missingSport.length > 0) {

                var ensSport = this.recupSport.concat(this.Formeditperson.value.sports)

                var ensLocality = this.recupLocality.concat(this.Formeditperson.value.locality)

                const sportId = ensSport.map(items => Object.assign({id: items}));
                this.Formeditperson.value.sports = sportId;

                const lieuId = ensLocality.map(item => Object.assign({id: item}));
                this.Formeditperson.value.locality = lieuId;


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
