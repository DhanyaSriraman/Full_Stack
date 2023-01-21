import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  
   isLoggedOut!:boolean;
  constructor(private authService:AuthService,
    private router :Router) { this.isLoggedOut =false }

  ngOnInit(): void {
  }
  onLogoutClick()
   {
    this.authService.logout();
    this.isLoggedOut=true;
    this.router.navigate(['login']);

   }
}
