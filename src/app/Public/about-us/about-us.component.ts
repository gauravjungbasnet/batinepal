import { Component, OnInit } from '@angular/core';
import { IAboutUs } from 'src/app/Services/models/model';
import { AboutUsService } from 'src/app/Services/base-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers:[AboutUsService]
})
export class AboutUsComponent implements OnInit {

  public auObj: IAboutUs =<IAboutUs>{};

  constructor(private as:AboutUsService,
    private ss:NgxSpinnerService
    ) { }

getAboutUs(){
  this.as.getAll().subscribe(res=>{
    this.auObj = res.body[0];
    this.ss.hide();
  },err=>{
    this.ss.hide();
  });
}

  ngOnInit() {
    this.ss.show();
    this.getAboutUs();
  }

}
