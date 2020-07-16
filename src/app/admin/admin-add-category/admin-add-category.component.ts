import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CategoryService, FileService, FileDeleteService } from 'src/app/Services/base-service.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/Services/models/model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.css'],
  providers:[CategoryService, FileService, FileDeleteService]
})
export class AdminAddCategoryComponent implements OnInit {

public categoryList: ICategory[]=[];
public categoryObj: ICategory = <ICategory>{};
fileNames: any;
public selectedFile = null;
mainURL:string;
imagePath:string;

  @ViewChild('myInput')
  myInputVariable: ElementRef;


  constructor(private os: CategoryService,
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
      this.categoryList = res.body;
      })
    }

    public submitData()
{
  if (this.selectedFile) {
      this.os.post(this.categoryObj).subscribe(res => {
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

uploadFile(data: ICategory) {
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
        this.categoryObj = <ICategory>{};
        this.getData();
      });
    });
  }
}

edit(data:ICategory){
  this.categoryObj = data;
}

delete(data:ICategory){
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
  this.os.put(this.categoryObj.id,this.categoryObj).subscribe((res : any)=>{
    this.categoryObj = <ICategory>{};
    this.ts.success("Successfully Updated","Success!!")
    this.getData();
})
}

cancelUpdate(){
  this.categoryObj = <ICategory>{};
}
openModal(imagePath){
  this.imagePath = imagePath;
  this.ngxSmartModalService.getModal('myModal').open();
}

}
