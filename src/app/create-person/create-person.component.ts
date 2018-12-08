import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Addperson} from '../../Modele/modele.Person';
import {personService} from '../../service/personService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {
  addperson:Addperson=new Addperson();
  Formaddperson: FormGroup;
  mode:number=1;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private formBuilder: FormBuilder,public personService:personService,private router:Router) { }

  ngOnInit() {
    this.Formaddperson = this.formBuilder.group({
      id: [],
      firstname: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      lastname: ['', Validators.compose([Validators.required,Validators.minLength(1)])],
      email: ['', [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      password:['',Validators.required],
      sports: [ null],
      locality: [ null],
    });
  }
  savePerson(){
    console.log(this.addperson);
  console.log("create ",this.Formaddperson.value)

    this.personService.createPerson(this.Formaddperson.value)
      .subscribe((data:any)=>{
          console.log(data.id)
          if (data.id==null){
            this.mode=2;
          }
          this.router.navigate(['login']);
        },err=>{

        }
      )
  }

}
