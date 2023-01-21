import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {HttpService} from '../services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username !: String;
    password !: String;
    isLogged !: Boolean
  constructor(private authService : AuthService,
    private router : Router,private http: HttpService) { this.isLogged=true }

  ngOnInit(): void {
  }
  onLoginSubmit()
  {
    const user={
      username : this.username,
      password : this.password
    }
    this.authService.authenticateUser(user).subscribe(data=>{
        if(data.success)
        {
          this.authService.storeUserData(data.token,data.user);
          this.isLogged=true;
          this.router.navigate(['profile']);
        }else{
          this.isLogged=false;
          this.router.navigate(['login'])
        }
    });
  
  }
}
