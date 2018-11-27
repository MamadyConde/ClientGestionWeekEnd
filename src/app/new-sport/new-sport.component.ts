import { Component, OnInit } from '@angular/core';
import {lieuService} from '../../service/lieuService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sportService} from '../../service/sportService';
import {Addsport} from '../../Modele/modele.Sport';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-sport',
  templateUrl: './new-sport.component.html',
  styleUrls: ['./new-sport.component.css']
})
export class NewSportComponent implements OnInit {
  addsport:Addsport=new Addsport();
  mode:number=1;
  pageLieu:any;
  constructor(private formBuilder: FormBuilder,public lieuService:lieuService,
              private sportService:sportService,private router:Router) { }
  addForm: FormGroup;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      locality: [ '',Validators.required],
    });

    this.lieuService.getlieu()
      .subscribe(data =>{
          this.pageLieu=data;
        },err=>{
          console.log(err);
        }
      );
  }
  SaveSport(){

    const lieuId = this.addForm.value.locality.map(item=>Object.assign({id:item}));
    this.addForm.value.locality = lieuId;

    this.sportService.saveSport(this.addForm.value)
      .subscribe((data:any)=>{
        console.log(data.id)
        this.ngOnInit();
        if(data.id==null){
          this.mode=2
        }
        this.router.navigate(['sport']);
      })
  }
}
