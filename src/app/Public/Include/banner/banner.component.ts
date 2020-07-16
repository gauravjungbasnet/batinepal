import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/Services/base-service.service';
import { IBanner } from 'src/app/Services/models/model';

import {environment} from '../../../../environments/environment'


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  providers:[BannerService]
})
export class BannerComponent implements OnInit {
  public mainURL: string;


  noWrapSlides = false;

  bannerList: IBanner[] = [];

  constructor(private bs: BannerService) { 
    this.mainURL = environment.baseUrl;
    this.mainURL = this.mainURL.replace('/api','/files');
  }

  ngOnInit() {
    this.getImageList();
  }

getImageList(){
  this.bs.getAll().subscribe(res=>{
    this.bannerList = res.body;
    console.log(this.bannerList)
  })
}  

}
