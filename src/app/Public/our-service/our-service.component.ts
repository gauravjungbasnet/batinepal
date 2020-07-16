import { Component, OnInit } from '@angular/core';
import { OurServiceService } from 'src/app/Services/base-service.service';
import { IOurService } from 'src/app/Services/models/model';
import { NgxSpinnerService } from 'ngx-spinner';

import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-our-service',
  templateUrl: './our-service.component.html',
  styleUrls: ['./our-service.component.css'],
  providers:[OurServiceService]
})
export class OurServiceComponent implements OnInit {
  public mainURL: string;
public osObject: IOurService[]=[];
  constructor(private os: OurServiceService,
    private ss:NgxSpinnerService) {
      this.mainURL = environment.baseUrl;
      this.mainURL = this.mainURL.replace('/api','/files');
     }

  ngOnInit() {
    this.ss.show();
    this.getData();
  }

  getData(){
    this.os.getAll().subscribe(res=>{
      this.osObject = res.body;
      this.ss.hide();
    },err=>{
      this.ss.hide();
    });
  }

}
