import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateRegister(user: {
    name: String; 
    email: String; 
    username: String;
    password: String;
}){
    if(user.name==undefined || user.email ==undefined || user.username == undefined || user.password==undefined)
    return false;
    else
    return true;
    }

    validateEmail(email: any){
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email);
    }
}
