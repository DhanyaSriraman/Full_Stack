import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {HttpService} from '../services/http.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userValid !: Boolean;
  emailValid !:Boolean;
  isAuthenticated !: Boolean;
   name !:String;
   username !:String;
   email !:String;
   password!:String;
  constructor(private validateService : ValidateService,
    private authservice : AuthService,
    private router : Router,
    private http: HttpService
   ) { this.userValid=true,this.emailValid=true,this.isAuthenticated=true}

  ngOnInit(): void {
  }

  onRegisterSubmit(){
  
   
    const user={
      name:this.name,
      email : this.email,
      username : this.username,
      password : this.password
    }

    if(!this.validateService.validateRegister(user)){
      this.userValid=false;
      console.log("Please fill in valid details");
      return false;
      
    }
    if(!this.validateService.validateEmail(user.email)){
      this.emailValid=false;
      console.log("Please fill in valid email");

      return false;
    }
    //Register user
    this.authservice.registerUser(user).subscribe(data=>{
       if(data.success)
       {
         this.isAuthenticated=true;
         this.router.navigate(['/login']);  
       }else{
        this.isAuthenticated=false;
        console.log('Failed');
        this.router.navigate(['/register']);

       }
    });

    this.http.sendEmail("http://localhost:3000/sendmail",user).subscribe(
      (data: any)=>{
       console.log(`${user.username} is logged in`);
     });
    return true;

  }

}
