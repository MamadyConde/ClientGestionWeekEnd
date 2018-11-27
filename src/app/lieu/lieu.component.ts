import { Component, OnInit } from '@angular/core';
import {lieuService} from '../../service/lieuService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lieu',
  templateUrl: './lieu.component.html',
  styleUrls: ['./lieu.component.css']
})
export class LieuComponent implements OnInit {
  pageLieu:any;
  constructor(public lieuService:lieuService,private router:Router) { }

  ngOnInit() {
    this.lieuService.getlieu()
      .subscribe(data =>{
          this.pageLieu=data;
        },err=>{
        console.log(err);
        this.router.navigateByUrl('/login')
        }
      );
  }

}
