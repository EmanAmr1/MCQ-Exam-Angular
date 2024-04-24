import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  user:any={}
  subjectsArr:any[]=[]
 
  constructor(private service:DoctorService ,private auth:AuthService) { }

  ngOnInit(): void {
    this.getSubjects()
    this.getUserRole()
  }


getSubjects(){
  this.service.getAllSubjects().subscribe((res:any)=>{

    this.subjectsArr=res
  })
}

getUserRole(){
  this.auth.getRole().subscribe(res=>{
this.user=res
  })

}

delete(index:number){
let id=this.subjectsArr[index].id
this.subjectsArr.splice(index,1);
this.service.deleteSubject(id).subscribe(res=>{
  alert("تم الحذف بنجاح")

})}











}


