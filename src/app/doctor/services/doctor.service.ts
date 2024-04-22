import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  createSubject(model:any){
    return this.http.post(environment.baseApi+'subject',model)

  }

updateSubject(model:any , id:number){
  return this.http.put(environment.baseApi+"subject/"+id , model)
}


getAllSubjects(){
  return this.http.get(environment.baseApi+'subject')
}


getSubjectById(id:number){
  return this.http.get(environment.baseApi+'subject/'+id)
}

deleteSubject(id:number){
return this.http.delete(environment.baseApi+'subject/' + id)
}
}
