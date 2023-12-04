import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl:string="http://localhost:3000/student/";

  constructor(private http:HttpClient) { }


  studentPost(data:any){
    return this.http.post<any>(this.baseUrl,data)
    .pipe(map(
      (res=>{
        return res;
      })
    ))

  }

  getAllStudent(){
    return this.http.get<any>(this.baseUrl)
    .pipe(map(
      (res=>{
        return res;
      })
    ))

  }

  deleteStudent(roll:number){
    return this.http.delete<any>(this.baseUrl+roll)
    .pipe(map(
      (res=>{
        return res;
      })
    ))

  }



  editStudent(roll:number, row:any){
    return this.http.put<any>(this.baseUrl+roll, row)
    .pipe(map(
      (res=>{
        return res;
      })
    ))

  }


}