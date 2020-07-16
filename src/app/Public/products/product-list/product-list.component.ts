import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryWiseProduct } from 'src/app/Services/base-service.service';
import { IProduct } from 'src/app/Services/models/model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[CategoryWiseProduct]
})
export class ProductListComponent implements OnInit {
  public mainURL: string;

  productList: IProduct[]=[];
  productDetails: IProduct = <IProduct>{};
  showProduct: boolean;

  constructor(private ar: ActivatedRoute,
    private cwps:CategoryWiseProduct,
    public ngxSmartModalService: NgxSmartModalService
    ) { 
      this.mainURL = environment.baseUrl;
      this.mainURL = this.mainURL.replace('/api','/files'); 
    }

  ngOnInit() {
    this.getProductList();
  }

  viewDetails(data:IProduct){
    this.productDetails = data;
    this.ngxSmartModalService.getModal('myModal').open();
  }

  getProductList(){
    let id = this.ar.snapshot.params['id'];
    this.cwps.getCategoryWiseProduct(id).subscribe(res=>{
      this.productList = res.body;
      if(this.productList.length != 0){
        this.showProduct = true;
      }else{
        this.showProduct = false;
      }
    })
  }

}
