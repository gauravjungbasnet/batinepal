import { Component, OnInit } from '@angular/core';
import { IFooter } from 'src/app/Services/models/model';
import { FooterService } from 'src/app/Services/base-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css'],
  providers: [FooterService]
})
export class AdminFooterComponent implements OnInit {

public osObj: IFooter = <IFooter>{};

  constructor(private fs: FooterService,
    private ts: ToastrService,
    ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.fs.getAll().subscribe(res=>{
      if(res.body.length > 0){
        this.osObj = res.body[0];
      }
    })
  }

  submitData(){
    if(this.osObj.id){
      this.fs.put(this.osObj.id,this.osObj).subscribe(res=>{
        this.ts.success("Updated successfully","Success!!")
      });
    }else{
      this.fs.post(this.osObj).subscribe(res=>{
        this.ts.success("Completed successfully","Success!!")
      });
    }
  }

}
