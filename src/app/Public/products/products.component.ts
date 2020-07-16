import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/base-service.service';
import { ICategory } from 'src/app/Services/models/model';
import { NgxSpinnerService } from 'ngx-spinner';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [CategoryService]
})
export class ProductsComponent implements OnInit {
  public mainURL: string;

public categoryList : ICategory[] = [];

  constructor(private cs: CategoryService,
    private ss:NgxSpinnerService) { 
      this.mainURL = environment.baseUrl;
      this.mainURL = this.mainURL.replace('/api','/files'); 
    }

  ngOnInit() {
    this.ss.show();
    this.getCategory();
  }

getCategory(){
  this.cs.getAll().subscribe(res=>{
    this.categoryList = res.body;
    this.ss.hide();
  },err=>{
    this.ss.hide();
  });
}

}
