import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NavigateComponent } from './navigate/navigate.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
const appRoutes : Routes=[
  {path : '',component : NavigateComponent},
  {path : 'register',component : RegisterComponent},
  {path : 'profile',component : ProfileComponent},
  {path : 'login',component :LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfileComponent,
    NavigateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
