import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

UserForm!:FormGroup
studentsArr:any[]=[]


  constructor(private fb:FormBuilder,private service:AuthService , private router:Router) { }

  ngOnInit(): void {
    this.createForm()
    this.getStudents()
  }

createForm(){
  this.UserForm = this.fb.group(
    {
      username:['',[Validators.required]],
      email:['',[Validators.required , Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],


    }
  )
}

getStudents(){
  this.service.getUsers().subscribe((res:any)=>{
    this.studentsArr =res
  }
  )

}





submit(){
  const model ={
    username:this.UserForm.value.username,
    email:this.UserForm.value.email,
    password:this.UserForm.value.password
  }

  //to make email unique
let index =this.studentsArr.findIndex(item=> item.email == this.UserForm.value.email)

if(index !== -1){

  alert("الايميل موجود مسبقا")
}
else
{
  this.service.createUser(model).subscribe(res =>{
    alert("تم انشاء الحساب بنجاح")
    this.router.navigate(['/subjects'])
  })
}
}

}
