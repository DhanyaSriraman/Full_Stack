import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user : any;
  constructor(private http: HttpClient) { }

  registerUser(user: any){
    let headers =new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/login',user,{headers :headers}).pipe(map((res : any) => res));

  }
  uploadCourse(courses : any){
    let headers =new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/course/insert',courses,{headers :headers}).pipe(map((res : any) => res));
  }
  authenticateUser(user: any){
    let headers =new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers :headers}).pipe(map((res : any) => res));
  }

  storeUserData(token :any,user:any){
      localStorage.setItem('id_token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken=token;
      this.user=user;

  }

  getProfile()
  {
    console.log("Its inside getprofile")
    let headers = new HttpHeaders();
    this.loadToken();
    headers=headers.append('Authorization',this.authToken)
    headers=headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers :headers}).pipe(map((res : any) => res));
  }

  getCourses(){
    console.log("Its inside getCourses")
    let headers = new HttpHeaders();
    headers=headers.append('Content-Type','application/json');
    console.log("Yello")
    return this.http.get('http://localhost:3000/course/get',{headers :headers}).pipe(map((res : any) => res));
    console.log("Back yello")
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken=token;
  }

  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
}
