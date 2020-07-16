import { Component, OnInit } from '@angular/core';
import { ILogin } from '../Services/models/model';
import { LoginService } from '../Services/base-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../Services/auth-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService,AuthServiceService]
})
export class LoginComponent implements OnInit {

  loginCredential: ILogin = <ILogin>{};
  errorMessage: string;

  constructor(private loginService: LoginService,
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private router: Router,
    private ss: NgxSpinnerService
    ) { 
      this.ss.show();
      this.checkLogin();
    }

  login()
  {
    if(this.loginCredential.email && this.loginCredential.password){
      this.ss.show();
      this.authUser(this.loginCredential);
    }
   
  }
  authUser(loginData:any) {
    var that = this;
    that.authService.logIn(loginData).subscribe((data:any)=>{
      that.ss.hide();
      that.errorMessage = null;
      if(data.success.token != null) {
          localStorage.setItem('token',JSON.stringify(data));
        this.storeUserData()
      } else {
        that.errorMessage = " Sorry login failed. Please try again later";
        this.toastr.error(that.errorMessage,"Error");
      }
    },err=>{
      that.ss.hide();
      that.errorMessage = err.errorDetail[0];
      this.toastr.error(that.errorMessage,"Error");
    })
  }

  storeUserData(){
    var that = this;
      var userDataCredentials = JSON.parse(localStorage.getItem('token'));
    if(userDataCredentials != null) {
      that.authService.getUserDetails(userDataCredentials).subscribe((data:any)=>{
        localStorage.setItem('userDetails',JSON.stringify(data));
      that.ss.hide();
        this.router.navigate(['/admin']);
      }, err=>{
      that.ss.hide();
      that.authService.logOut();
      })
    }else{
      that.ss.hide();
    }
  }

  checkLogin(){
    var that = this;
    var userDataCredentials = JSON.parse(localStorage.getItem('token'));
    if(userDataCredentials != null) {
      that.authService.getUserDetails(userDataCredentials).subscribe((data:any)=>{
      that.ss.hide();
        localStorage.setItem('userDetails',JSON.stringify(data));
        this.router.navigate(['/admin']);
      }, err=>{
        that.ss.hide();
        that.authService.logOut();
      })
    }else{
      that.ss.hide();
    }
  }

  ngOnInit() {
  }

}
