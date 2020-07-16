import { Component, OnInit, ViewChild, ElementRef   } from '@angular/core';
import { OurServiceService, FileService, FileDeleteService } from 'src/app/Services/base-service.service';
import { IOurService } from 'src/app/Services/models/model';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-our-service',
  templateUrl: './admin-our-service.component.html',
  styleUrls: ['./admin-our-service.component.css'],
  providers: [OurServiceService,FileService,FileDeleteService]
})
export class AdminOurServiceComponent implements OnInit {

  public osObj: IOurService = <IOurService>{};
  public osList:IOurService[] = [];
  fileNames: any;
  public selectedFile = null;
  mainURL:string;
  imagePath:string;


  @ViewChild('myInput')
  myInputVariable: ElementRef;


  constructor(private os: OurServiceService,
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
      this.os.getAll().subscribe(res=>{
      this.osList = res.body;
      })
    }

    public submitData()
{
  if (this.selectedFile) {
      this.os.post(this.osObj).subscribe(res => {
        this.uploadFile(res);
        
      });
    }else{
      this.ts.warning("Please Select Image","Warning!!");
    }
}

 // imageupload
 uploadImage(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadFile(data: IOurService) {
  if (this.selectedFile) {
    let elem = event.target;  //line 2
      let formData = new FormData();  //line 4
      formData.append('myfile', this.selectedFile);  //line 5
    this.fs.upload(formData).subscribe((rp :any) => {

      this.fileNames = rp;
      data.imagePath = this.fileNames;
      this.os.put(data.id, data).subscribe(response => {
        this.ts.success("Completed successfully","Success!!")
        this.myInputVariable.nativeElement.value = '';
        this.selectedFile = null;
        this.osObj = <IOurService>{};
        this.getData();
      });
    });
  }
}

edit(data:IOurService){
  this.osObj = data;
}

delete(data:IOurService){
  if(confirm("Are you sure to delete")){
    this.os.delete(data.id).subscribe(res=>{
      var item = {
        fileName:data.imagePath
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

update(){
  this.os.put(this.osObj.id,this.osObj).subscribe((res : any)=>{
    this.osObj = <IOurService>{};
    this.ts.success("Successfully Updated","Success!!")
    this.getData();
})
}

cancelUpdate(){
  this.osObj = <IOurService>{};
}

openModal(imagePath){
  this.imagePath = imagePath;
  this.ngxSmartModalService.getModal('myModal').open();
}

}
