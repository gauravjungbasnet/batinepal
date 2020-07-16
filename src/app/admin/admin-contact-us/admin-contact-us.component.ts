import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/Services/models/model';
import { ContactService } from 'src/app/Services/base-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-contact-us',
  templateUrl: './admin-contact-us.component.html',
  styleUrls: ['./admin-contact-us.component.css'],
  providers:[ContactService]
})
export class AdminContactUsComponent implements OnInit {
  public osList:IContact[] = [];
 
  constructor(private cs:ContactService,
    private ts:ToastrService) { }

  getData() {
    this.cs.getAll().subscribe(res=>{
      this.osList = res.body;
    })
  }

  ngOnInit() {
    this.getData();
  }

  delete(data:IContact){
    if(confirm("Are you sure to delete?")){
      this.cs.delete(data.id).subscribe(res=>{
        this.getData();
        this.ts.success("Deleted Successfully!!!","Success");
      });
    }
    
  }

}
