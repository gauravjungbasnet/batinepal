import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../Services/auth-service.service';
import { Router } from '@angular/router';
import { IUsers } from '../Services/models/model';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[AuthServiceService]
})
export class AdminComponent implements OnInit {
  displayYear:number;
  userDetails: IUsers=<IUsers>{};
  constructor(
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private router: Router) { 
    let date =new Date();
    this.displayYear = date.getFullYear() || -1;
    
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails === null){
      this.checkLogin();
    }
  }

  ngOnInit() {
    $('.sidebar-menu').tree();
  }

  checkLogin(){
    var that = this;
    var userDataCredentials = JSON.parse(localStorage.getItem('token'));
    if(userDataCredentials != null) {
      that.authService.getUserDetails(userDataCredentials).subscribe((data:any)=>{
        localStorage.setItem('userDetails',JSON.stringify(data));
        this.router.navigate(['/admin']);
      }, err=>{
        that.authService.logOut();
      })
    }else{
      that.authService.logOut();
    }
  }

  logOut(){
    this.authService.logOut();
  }

}
