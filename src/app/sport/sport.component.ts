import { Component, OnInit } from '@angular/core';
import {sportService} from '../../service/sportService';
import {Router} from '@angular/router';
import {Addsport} from '../../Modele/modele.Sport';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
pageSport:any;
  constructor(public sportService:sportService,private router:Router) { }

  ngOnInit() {
    this.sportService.getsport()
      .subscribe(data=>{
        console.log("datta ",data)
        this.pageSport=data;
      },err=>{
        console.log(err);
        this.router.navigateByUrl('/login')
      });
  }
  onDeleteSport(c:Addsport){
    let confirm = window.confirm("Êtes-Vous sûr?")
    if(confirm == true){
      this.sportService.deleteSport(c.id)
        .subscribe(data=> {
          this.pageSport.splice(
            this.pageSport.indexOf(c), 1
          );
        }, err=>{
          console.log(err);
        })
    }

  }
  onEditSport(id:number){
    this.router.navigate(['editSport',id]);
  }

}
