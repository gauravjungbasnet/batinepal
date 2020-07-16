import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IAboutUs } from 'src/app/Services/models/model';
import { AboutUsService } from 'src/app/Services/base-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-about-us',
  templateUrl: './admin-about-us.component.html',
  styleUrls: ['./admin-about-us.component.css'],
  providers: [AboutUsService]
})
export class AdminAboutUsComponent implements OnInit {
  public aboutUsObj: IAboutUs =<IAboutUs>{};
  constructor(private as: AboutUsService,private ts:ToastrService) { }
  ngOnInit() {
  }

  ngAfterViewInit(){
    var that = this;
    setTimeout(function(){
      that.getData();
    },300);
  }

  submitData(){
    if(!this.aboutUsObj.id){
      this.as.post(this.aboutUsObj).subscribe((res:any)=>{
        this.getData();
        this.ts.success("Successfully Inserted","Successs");
      });
    }else{
      // var item : IAboutUs =<IAboutUs>{};
      // item.id = this.aboutUsObj.id;
      // item.title = this.aboutUsObj.title;
      // item.description = this.aboutUsObj.description;
      // item.company_name = this.aboutUsObj.company_name;
      this.as.put(this.aboutUsObj.id,this.aboutUsObj).subscribe((res:any)=>{
        this.aboutUsObj = <IAboutUs>{};
        this.getData();
        this.ts.success("Successfully Updates","Successs");
      });
    }
    
  }

  getData(){
    this.as.getAll().subscribe((res:any)=>{
      if(res.body.length > 0){
        this.aboutUsObj = res.body[0];
      }
    });
  }

}
