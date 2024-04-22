import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  id:any
  subject:any
user:any
  constructor(private route:ActivatedRoute , private service:DoctorService , private auth:AuthService) {

  this.id= this.route.snapshot.paramMap.get('id')
  this.getSubjectById()
  console.log(this.id)
  this.getUserRole()
  }
  ngOnInit(): void {

  }

  getSubjectById(){
    return this.service.getSubjectById(this.id).subscribe(res=>{
 this.subject=res
    })
  }


  delete(index:number){

    this.subject.questionsArr.splice(index,1) //delete
    const model ={ //then send new model without deleted item
      subjectValue:this.subject.subjectValue,
      questionsArr:this.subject.questionsArr
        }

        this.service.updateSubject(model,this.id).subscribe((res)=>{
          alert("تم حذف السؤال بنجاح")
        })

  }


  getUserRole(){
    this.auth.getRole().subscribe(res=>{
  this.user=res
    })

  }





}
