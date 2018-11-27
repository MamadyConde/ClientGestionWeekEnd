import { Component, OnInit } from '@angular/core';
import {lieuService} from '../../service/lieuService';
import {Router} from '@angular/router';
import {Addlieu} from '../../Modele/modele.Lieu';

@Component({
  selector: 'app-new-lieu',
  templateUrl: './new-lieu.component.html',
  styleUrls: ['./new-lieu.component.css']
})
export class NewLieuComponent implements OnInit {
  mode:number=1;
  addlieu:Addlieu = new Addlieu();
  constructor( public lieuService:lieuService,private router:Router) { }

  ngOnInit() {
  }
  saveLieu(){

    this.lieuService.saveLieu(this.addlieu)  //save de service
      .subscribe((data:any) =>{
        console.log(data.id)
        if (data.id==null){
          this.mode=2;
        }else{
          this.mode = 3;
          this.router.navigate(['lieu']);
        }

      },err=>{

      })
  }

}
