import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  subjectName =new FormControl
  questionsForm!:FormGroup

  correctAnswer:any

  questionsArr:any[]=[]

  constructor(private fb:FormBuilder) { }

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


submit(){
  const model ={

  }
}

}
