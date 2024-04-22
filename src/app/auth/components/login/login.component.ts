import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup
  usersArr:any[]=[]
  type:string= "students"

    constructor(private fb:FormBuilder,private service:AuthService , private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.createForm()
  }

  createForm(){
    this.LoginForm = this.fb.group(
      {
        type:this.type,
        email:['',[Validators.required , Validators.email]],
        password:['',[Validators.required]],
      }
    )
  }

getRole(event:any){
  this.type=event.value;
  this.getUsers()
}

  getUsers(){
    this.service.getUsers(this.type).subscribe((res:any)=>{
      this.usersArr =res
    }
    )

  }





  submit(){
    //check email and password
  let index =this.usersArr.findIndex(item=> item.email == this.LoginForm.value.email && item.password == this.LoginForm.value.password)
  if(index == -1){
    alert("الايميل او كلمه المرور غير صحيح")
  }
  else
  {

  const model={
  username:this.usersArr[index].username,
  userId:this.usersArr[index].id,
  role:this.type
     }
    this.service.login(model).subscribe(res =>{
      this.service.user.next(res)
      alert("تم دخول الحساب بنجاح")
      this.router.navigate(['/subjects'])
    })
  }
  }
}
