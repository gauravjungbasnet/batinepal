import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { IBanner } from 'src/app/Services/models/model';
import { BannerService, FileService, FileDeleteService } from 'src/app/Services/base-service.service';
import { ToastrConfig, ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-banner',
  templateUrl: './admin-banner.component.html',
  styleUrls: ['./admin-banner.component.css'],
  providers:[BannerService,FileService,FileDeleteService]
})
export class AdminBannerComponent implements OnInit {

  @ViewChild('myInput')
  myInputVariable: ElementRef;

public bannerObj: IBanner = <IBanner>{};
public bannerList:IBanner[] = [];

public selectedFile = null;

fileNames: any;

mainURL:string;
imagePath:string;

  constructor(private bs: BannerService,
    private fs: FileService,
    private ts: ToastrService,
    private fds: FileDeleteService,
    public ngxSmartModalService: NgxSmartModalService
    ) { 
      this.mainURL = environment.baseUrl;
    this.mainURL = this.mainURL.replace('/api','/files');
      this.getData();
    }

  ngOnInit() {
  }

getData(){
  this.bs.getAll().subscribe(res=>{
this.bannerList = res.body;
  })
}

public submitData()
{
  if(this.bannerObj.id){
this.bs.put(this.bannerObj.id,this.bannerObj).subscribe(res=>{
  this.ts.success("Updated Successfully","Success!!");
  this.bannerObj = <IBanner>{};
})
  }else{
    if (this.selectedFile) {
      this.bs.post(this.bannerObj).subscribe(res => {
        this.uploadFile(res);
        
      });
    }else{
      this.ts.warning("Please Select Image","Warning!!");
    }
  }
  
}
 // imageupload
 uploadImage(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadFile(data: IBanner) {
  if (this.selectedFile) {
    let elem = event.target;  //line 2
      let formData = new FormData();  //line 4
      formData.append('myfile', this.selectedFile);  //line 5
    this.fs.upload(formData).subscribe((rp :any) => {

      this.fileNames = rp;
      data.ImagePath = this.fileNames;
      this.bs.put(data.id, data).subscribe(response => {
        this.ts.success("Completed successfully","Success!!")
        this.myInputVariable.nativeElement.value = '';
        this.selectedFile = null;
        this.bannerObj = <IBanner>{};
        this.getData();
      });
    });
  }
}

deleteBanner(data:IBanner){
  if(confirm("Are you sure to delete")){
    this.bs.delete(data.id).subscribe(res=>{
      var item = {
        fileName:data.ImagePath
      };
      this.fds.post(item).subscribe(rp=>{
        this.ts.success("Deleted successfully","Success!!");
        this.getData();
      },err=>{
        this.ts.warning("Image Not Found","Item Deleted!!");
        this.getData();
      })
    });
  }
}

editBanner(data: IBanner){
  this.bannerObj = data;
}
openModal(imagePath){
  this.imagePath = imagePath;
  this.ngxSmartModalService.getModal('myModal').open();
}

}
