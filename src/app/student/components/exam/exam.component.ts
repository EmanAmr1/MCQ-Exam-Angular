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
stuInfo:any
total:number=0
showResult:boolean=false
userSubjects:any[]=[]
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
this.getUserData()
    })

  }

  getUserData(){
    this.auth.getStudent(this.user.userId).subscribe((res:any)=>{
      this.stuInfo=res
      this.userSubjects=res?.subjects ? res?.subject :[]
    })
  }

 getAnswer(event:any){
  let stuValue = event.value, // the selected value by student
      questionIndex = event.source.name //save q index
console.log(questionIndex)

  this.subject.questionsArr[questionIndex].studentAnswer = stuValue //make studentAnswer variable to set to it the value
console.log(event)
console.log(this.subject.questionsArr)
 }



 result(){
  this.total=0
  this.showResult=true
for (let  x in this.subject.questionsArr)
  {
    if(this.subject.questionsArr[x].studentAnswer == this.subject.questionsArr[x].correctAnswer){
      this.total+=1
    }


  }
this.userSubjects.push({
  name:this.subject.subjectValue,
  id:this.id,
  degree:this.total

})
  const model={
    username: this.stuInfo.username,
    email:this.stuInfo.email ,
    password: this.stuInfo.password,
    subjectsArr:this.userSubjects
  }
  this.auth.updateStudent(this.user.userId, model).subscribe(res=>{
    alert("تم تسجيل النتيجه بنجاح")
  })
  console.log("t"+this.total)
 }








}
