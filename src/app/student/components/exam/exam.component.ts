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
validExam:boolean=true


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
      console.log("API Response:", res);
      this.stuInfo=res
      //this.userSubjects=res && res?.subjects ? res?.subject :[];
      this.userSubjects = res.subjectsArr || [];
      console.log("User subjects:", this.userSubjects);
      this.checkUserValidExam()
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




/*checkUserValidExam(){
  for( let x in this.userSubjects){
    if(this.userSubjects[x].id == this.id)
      {
        this.validExam=false;
      }
  }
  console.log(this.validExam)
}*/

checkUserValidExam() {
  for (let x = 0; x < this.userSubjects.length; x++) {
    console.log("Checking exam with ID:", this.userSubjects[x].id);
    console.log("Current ID to check against:", this.id);
    if (this.userSubjects[x].id == this.id) {
      this.total= this.userSubjects[x].degree
      console.log("User has already taken this exam.");
      this.validExam = false;
      return; // Exit the loop once the exam is found
    }
  }
  console.log("User hasn't taken this exam yet.");
  console.log("Setting validExam to true.");
  this.validExam = true;
  console.log("validExam:", this.validExam);
}

}
