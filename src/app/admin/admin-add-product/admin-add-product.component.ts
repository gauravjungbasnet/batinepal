import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct, ICategory } from 'src/app/Services/models/model';
import { ProductService, FileService, FileDeleteService, CategoryService } from 'src/app/Services/base-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
  providers: [ProductService, FileService, FileDeleteService,CategoryService]
})
export class AdminAddProductComponent implements OnInit {

  public productList: IProduct[]=[];
  public productObj: IProduct = <IProduct>{};
  fileNames: any;
  public selectedFile = null;
  public categoryList : ICategory[] = [];
  mainURL:string;
  imagePath:string;

  
    @ViewChild('myInput')
    myInputVariable: ElementRef;
  
  
    constructor(private os: ProductService,
      private fs: FileService,
      private ts: ToastrService,
      private fds: FileDeleteService,
      private cs: CategoryService,
      public ngxSmartModalService: NgxSmartModalService
      ) {
        this.mainURL = environment.baseUrl;
      this.mainURL = this.mainURL.replace('/api','/files');
        this.getData();
       }
        
    ngOnInit() {
      this.getCategory();
    }

    getCategory(){
      this.cs.getAll().subscribe(res=>{
        this.categoryList = res.body;
      })
    }
  
      getData(){
        this.os.getAll().subscribe(res=>{
        this.productList = res.body;
        })
      }
  
      public submitData()
  {
    if (this.selectedFile) {
        this.os.post(this.productObj).subscribe(res => {
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
  
  uploadFile(data: IProduct) {
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
          this.productObj = <IProduct>{};
          this.getData();
        });
      });
    }
  }
  
  edit(data:IProduct){
    this.productObj = data;
  }
  
  delete(data:IProduct){
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
    this.os.put(this.productObj.id,this.productObj).subscribe((res : any)=>{
      this.productObj = <IProduct>{};
      this.ts.success("Successfully Updated","Success!!")
      this.getData();
  })
  }
  
  cancelUpdate(){
    this.productObj = <IProduct>{};
  }
  openModal(imagePath){
    this.imagePath = imagePath;
    this.ngxSmartModalService.getModal('myModal').open();
  }
  
  
}
