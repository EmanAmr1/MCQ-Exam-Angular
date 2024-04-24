import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
stuArr:any[]=[]
subjArr:any[]=[]

  constructor(private service:AuthService) {

   }


  ngOnInit(): void {
    this.getStudents()
  }


  getStudents(){

this.service.getUsers('students').subscribe((res:any)=>{
this.stuArr=res
this.subjArr=res.subjectsArr
})


  }

}
