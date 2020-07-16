import { Component, OnInit } from '@angular/core';
import { IHeader } from 'src/app/Services/models/model';
import { HeaderService } from 'src/app/Services/base-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  providers:[HeaderService]
})
export class AdminHeaderComponent implements OnInit {

  public headerObj: IHeader = <IHeader>{};
  public headerList: IHeader[] = [];

  constructor(private hs: HeaderService,
    private toastr: ToastrService
    ) {this.getHeaderData() }

  ngOnInit() {
  }

  getHeaderData(){
    this.hs.getAll().subscribe((res:any)=>{
      this.headerList = res.body;
    })
  }

  submitHeaderData() {
    if(this.headerObj.statusDD == "1"){
      this.headerObj.status = true;
    }else{
      this.headerObj.status = false;
    }
      this.hs.post(this.headerObj).subscribe((res : any)=>{
        this.headerObj = <IHeader>{};
        this.toastr.success("Successfully Added","Success!!")
        this.getHeaderData();
    })
  }

  deleteHeader(id: number){
    if(confirm("Are you sure to delete ?")){
      this.hs.delete(id).subscribe(res=>{
        this.toastr.success("Successfully Deleted","Success!!");
        this.getHeaderData();
      });
    }
  }

  editHeader(data:IHeader){
    this.headerObj = data;
    if(this.headerObj.status == true){
      this.headerObj.statusDD = '1';
    }else{
      this.headerObj.statusDD = '0';
    }
  }

  updateHeader(){
    if(this.headerObj.statusDD == "1"){
      this.headerObj.status = true;
    }else{
      this.headerObj.status = false;
    }
    this.hs.put(this.headerObj.id,this.headerObj).subscribe((res : any)=>{
      this.headerObj = <IHeader>{};
      this.toastr.success("Successfully Updated","Success!!")
      this.getHeaderData();
  })
  }

  cancelUpdate(){
    this.headerObj =<IHeader>{};
  }


}
