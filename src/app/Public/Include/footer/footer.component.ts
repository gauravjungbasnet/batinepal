import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/Services/base-service.service';
import { IFooter } from 'src/app/Services/models/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers:[FooterService]
})
export class FooterComponent implements OnInit {
  public currentYear: number;
  public fsObj:IFooter=<IFooter>{};
  constructor(private fs:FooterService,
    private ts:ToastrService) { 
    this.currentYear=new Date().getFullYear();
  }

  ngOnInit() {
    this.getDate();
  }

  getDate(){
    this.fs.getAll().subscribe(res=>{
      this.fsObj=res.body[0];
    })
  }

  checkStatus(){
    var date = new Date();

var time = date.getHours();

    if( date.getDay() == 6){
      this.ts.info("We are Close Today","Happy Saturday");
    }else{
      if(time > 9 && time < 17 ){
        this.ts.success("Vist us by following on map","We are Open");
      }else {
        this.ts.info("Will open soon,Please vist us by following map","We are close for now");
      }
    }
  }

}
