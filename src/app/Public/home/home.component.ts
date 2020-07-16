import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AboutUsService, OurServiceService, CategoryService, TestimonialsService, OurTeamService, HeaderService } from 'src/app/Services/base-service.service';
import { IAboutUs, IOurService, ICategory, ITestimonials, IOurTeam, IHeader } from 'src/app/Services/models/model';
import { NgxSpinnerService } from "ngx-spinner";

import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AboutUsService,OurServiceService,CategoryService,TestimonialsService,OurTeamService,HeaderService]
})
export class HomeComponent implements OnInit {

  public mainURL: string;

  constructor(private as: AboutUsService,
    private os: OurServiceService,
    private cs: CategoryService,
    private ts: TestimonialsService,
    private ot: OurTeamService,
    private spinner: NgxSpinnerService
    ) { }

  aboutUsObj : IAboutUs = <IAboutUs>{};

  ourServiceList: IOurService[] =[]; 
  categoryList: ICategory[]=[];
  testimonialList: ITestimonials[]=[];
  ourTeamList: IOurTeam[]=[];
  headerList: IHeader[]=[];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    breakpoints:{
       640:{
            slidesPerView: 1, 
           }
    }
};
public configb: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: true,
  pagination: false,
};

public configc: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 3,
  keyboard: false,
  mousewheel: false,
  scrollbar: false,
  navigation: true,
  pagination: false,
  breakpoints:{
     640:{
          slidesPerView: 1, 
         }
  }
};
  a = [{ url: 1 }, { url: 2 }, { url: 3 },{ url: 1 }, { url: 2 }, { url: 3 }];
  b = [{ url: 1 }, { url: 2 }, { url: 3 },{ url: 1 }, { url: 2 }, { url: 3 }];
  c = [{ url: 1 }, { url: 2 }, { url: 3 },{ url: 1 }, { url: 2 }, { url: 3 }];

  ngOnInit() {
    this.mainURL = environment.baseUrl;
    this.mainURL = this.mainURL.replace('/api','/files');
    this.spinner.show();
    setTimeout(() => {
    this.getAboutUs();
    this.getOurService();
    this.getCategory();
    this.gettestimonials();
    this.getOurTeam();
    }, 300);
  }

  getCategory(){
    this.cs.getAll().subscribe(res=>{
      this.categoryList= res.body;
    })
  }

  getAboutUs(){
    this.as.getAll().subscribe(res=>{
      this.aboutUsObj = res.body[0];
    })
  }

  getOurService(){
    this.os.getAll().subscribe(res=>{
      this.ourServiceList = res.body;
    })
  }

  gettestimonials(){
    this.ts.getAll().subscribe(res=>{
      this.testimonialList = res.body;
    })
  }

  getOurTeam(){
    this.ot.getAll().subscribe(res=>{
      this.ourTeamList=res.body;
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
    })
  }

 

}
