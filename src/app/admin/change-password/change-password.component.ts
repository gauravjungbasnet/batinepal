import { Component, OnInit } from '@angular/core';
import { IUsersVM } from 'src/app/Services/models/viewModel';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from 'src/app/Services/base-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers:[ChangePasswordService]
})
export class ChangePasswordComponent implements OnInit {
  changePassword: IUsersVM = <IUsersVM>{};
  loggedInUser: IUsersVM = <IUsersVM>{};
  userId : number;
  errorMessage: string;
  successMessage: string;
  isActive: boolean;s

  constructor(
    private cps:ChangePasswordService,
    private toastrService: ToastrService
    ) { 
    this.loggedInUser = JSON.parse(localStorage.getItem('userDetails'));
    this.userId = this.loggedInUser.id;
    this.isActive = true;
  }

  ngOnInit() {
  }

  submitPassword(){
    console.log(this.userId, this.changePassword);
    this.changePassword.id = this.userId;
    this.cps.post(this.changePassword).subscribe((data:any)=>{
    this.changePassword = <IUsersVM>{};
     this.errorMessage = null;
     this.successMessage = data;
     this.toastrService.success(data,'Success');
    },err=>{
     this.successMessage = null;
      this.errorMessage = err.errorDetail;
    })
  }

showIsactive(){
  this.isActive = !this.isActive;
}

}
