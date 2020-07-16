import { Component, OnInit } from '@angular/core';
import { ITestimonials } from 'src/app/Services/models/model';
import { TestimonialsService } from 'src/app/Services/base-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  providers:[TestimonialsService]
})
export class TestimonialsComponent implements OnInit {
  public mainURL: string;

  public tsObj: ITestimonials[] = [];
  
  constructor(private ts: TestimonialsService,
    private ss:NgxSpinnerService) { 
      this.mainURL = environment.baseUrl;
      this.mainURL = this.mainURL.replace('/api','/files'); }

  ngOnInit() {
    this.ss.show();
    this.getData();
  }

  getData(){
    this.ts.getAll().subscribe(res=>{
      this.tsObj=res.body;
      this.ss.hide();
    },err=>{
      this.ss.hide();
    });
  }

}
