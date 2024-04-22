import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorModule } from '../../doctor.module';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  subjectName =new FormControl("")
  subjectValue=""
  questionsForm!:FormGroup

  correctAnswer:any
  stepperIndex=0;
  questionsArr:any[]=[]
  preview:boolean=false
  startAdd:boolean=false

  questionId:any
  constructor(private fb:FormBuilder , private service:DoctorService) { }



  ngOnInit(): void {
    this.createform()
  }


createform(){
this.questionsForm = this.fb.group({
  question:['',[Validators.required]],
  answer1:['',[Validators.required]],
  answer2:['',[Validators.required]],
  answer3:['',[Validators.required]],
  answer4:['',[Validators.required]],
})
}



getCorrectAnswer(event:any){
  this.correctAnswer=event.value
  console.log(event.value)
}




createQuestion(){
if(this.correctAnswer){
  const model ={
    question:this.questionsForm.value.question,
    answer1:this.questionsForm.value.answer1,
    answer2:this.questionsForm.value.answer2,
    answer3:this.questionsForm.value.answer3,
    answer4:this.questionsForm.value.answer4,
    correctAnswer:this.questionsForm.value[this.correctAnswer],
  }

this.questionsArr.push(model)
this.questionsForm.reset()

}else{
  alert("يرجى اختيار الاجابه الصحيحه")
}
console.log(this.questionsArr)
}


start(){
  if(this.subjectName.value == ""){
    alert("ادخل اسم المادة")

}else{

  this.startAdd=true
  this.subjectValue = this.subjectName.value

}

if(this.startAdd){
  this.stepperIndex=1
}

}



clearform(){
  this.questionsForm.reset()
}

cancel(){
  this.questionsForm.reset()
  this.questionsArr=[]
  this.subjectValue=""
this.subjectName.reset()
this.stepperIndex=0
this.startAdd=false

}

submit(){
  const model ={
subjectValue:this.subjectValue,
questionsArr:this.questionsArr
  }

  if(this.preview){
    this.stepperIndex=2
  }else {
    this.service.createSubject(model).subscribe((res:any)=>{
      this.preview=true;
this.questionId=res.id
        })
  }


}


delete(index:number){

  this.questionsArr.splice(index,1) //delete
  const model ={ //then send new model without deleted item
    subjectValue:this.subjectValue,
    questionsArr:this.questionsArr
      }

      this.service.updateSubject(model,this.questionId).subscribe((res)=>{
        alert("تم حذف السؤال بنجاح")
      })

}





}
