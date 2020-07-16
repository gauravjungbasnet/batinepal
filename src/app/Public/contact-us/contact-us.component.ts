import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/Services/models/model';
import { ContactService } from 'src/app/Services/base-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [ContactService]
})
export class ContactUsComponent implements OnInit {

  cObj: IContact = <IContact>{};

  constructor(private cs: ContactService,
    private ts: ToastrService,
    private ss:NgxSpinnerService
    ) { }

  ngOnInit() {
  }

  submitData()
  {
    this.cs.post(this.cObj).subscribe(res=>{
      this.cObj = <IContact>{};
      this.ts.success("We will get back to you!!!","Thankyou for response!!");
    });
  }

}
