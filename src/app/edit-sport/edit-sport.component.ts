import { Component, OnInit } from '@angular/core';
import {lieuService} from '../../service/lieuService';
import {sportService} from '../../service/sportService';
import {ActivatedRoute, Router} from '@angular/router';
import {Addsport} from '../../Modele/modele.Sport';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.css']
})
export class EditSportComponent implements OnInit {
  addsport:Addsport = new Addsport();
  pageLieu:any;
  idSport:any;

  constructor(public lieuService:lieuService,public sportService:sportService,
              public activaterRoute: ActivatedRoute,
              private formBuilder: FormBuilder,private router:Router) {

    this.idSport = activaterRoute.snapshot.params['id'];
  }
  Formeditsport:FormGroup;

  ngOnInit() {
    this.lieuService.getlieu()
      .subscribe(data => {
          this.pageLieu = data;
        }, err => {
          console.log(err);
        }
      );
    this.sportService.onesport(this.idSport)
      .subscribe((data:any) => {
          this.addsport = data;
        }, err => {
          console.log(err);
        }
      );
    this.Formeditsport = this.formBuilder.group({
      id:[this.idSport],
      name:['', Validators.compose([Validators.required,Validators.minLength(1)])],
      locality:['',Validators.required]
    })
  }
  updateSport(){
    const lieuId = this.Formeditsport.value.locality.map(item=>Object.assign({id:item}));
    this.Formeditsport.value.locality = lieuId;



    this.sportService.updateSport(this.Formeditsport.value)
      .subscribe(data=>{
        alert('Modification effectué');
        this.router.navigate(['sports']);
      },err=>{
        console.log(err);
        alert('Problème');
      })
  }

}
