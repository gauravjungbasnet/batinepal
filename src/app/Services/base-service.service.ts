import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { Observable, throwError } from 'rxjs';
import { IBanner, ILogin, IRegister, IHeader, IAboutUs, IOurTeam, ITestimonials, IContact, ICategory, IProduct, IFooter } from './models/model';
import { map } from  'rxjs/operators';
import { IUsersVM } from './models/viewModel';

export const domain = environment.baseUrl;

export interface IBaseService {
  getAll(query ?: any): Observable<any>;
  get(id:any,query ?: any): Observable<any>;
  put(id:any,item: any, query ?: any): Observable<any>;
  post( item: any,query ?: any): Observable<any>;
  delete( id: any,query ?: any): Observable<any>;
}

export class BaseServiceService<T> implements IBaseService {
  public baseUrl = ``;
  
  static get parameters() {
    return [[HttpClient]];
  }

  constructor(private http:HttpClient) { }

  getAll(query?: string):Observable<HttpResponse<T[]>>{
    if(query != null) {
      query = `?${query}`;
    } else {
      query = ``;
    }
    return this.http.get<T[]>(this.baseUrl + query, {observe:'response'});
  }

  get(id:any, query ?: string):Observable<HttpResponse<T>>{
    if( query != null) {
      query = `?${query}`;
    } else {
      query = ``;
    }
    return this.http.get<T>(this.baseUrl + `/${id}` + query, {observe:'response'});
  }

  post(item?: T, query ?: string):Observable<T> {
    if(query != null) {
      query= `?${query}`;
    }else {
      query =``;
    }
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post<T>(this.baseUrl + query, item,{headers: headers});
  }

  put(id: any, item?: T, query ?: string): Observable<T> {
    if(query != null) {
      query= `?${query}`;
    }else {
      query =``;
    }
    return this.http.put<T>(this.baseUrl + `/${id}` + query, item);
  }

  delete(id:any, query ?: string){
    if(query != null) {
      query= `?${query}`;
    }else {
      query =``;
    }
    return this.http.delete<T>(this.baseUrl + `/${id}` + query);
  }
  public upload(data) {

    return this.http.post<any>(this.baseUrl, data).pipe(map((event) => {

      return event;
    })
    );
  }
  public getCategoryWiseProduct(id:any):Observable<HttpResponse<T[]>>{
    return this.http.get<any>(this.baseUrl + `/${id}`, {observe:'response'});
  }
}

@Injectable()
export class BannerService extends BaseServiceService<IBanner> {
  public baseUrl = `${domain}/banner`;
}

@Injectable()
export class LoginService extends BaseServiceService<ILogin> {
  public baseUrl = `${domain}/login`;

}
@Injectable()
export class RegisterService extends BaseServiceService<IRegister> {
  public baseUrl = `${domain}/register`;
}
@Injectable()
export class HeaderService extends BaseServiceService<IHeader> {
  public baseUrl = `${domain}/header`;
}
@Injectable()
export class AboutUsService extends BaseServiceService<IAboutUs> {
  public baseUrl = `${domain}/about_us`;
}
@Injectable()
export class FileService extends BaseServiceService<any> {
  public baseUrl = `${domain}/uploadFile`;
}
@Injectable()
export class FileDeleteService extends BaseServiceService<any> {
  public baseUrl = `${domain}/deleteFile`;
}
@Injectable()
export class OurServiceService extends BaseServiceService<any> {
  public baseUrl = `${domain}/our_service`;
}
@Injectable()
export class OurTeamService extends BaseServiceService<IOurTeam> {
  public baseUrl = `${domain}/our_team`;
}
@Injectable()
export class TestimonialsService extends BaseServiceService<ITestimonials> {
  public baseUrl = `${domain}/testimonials`;
}
@Injectable()
export class ContactService extends BaseServiceService<IContact> {
  public baseUrl = `${domain}/contact`;
}
@Injectable()
export class CategoryService extends BaseServiceService<ICategory> {
  public baseUrl = `${domain}/category`;
}
@Injectable()
export class ProductService extends BaseServiceService<IProduct> {
  public baseUrl = `${domain}/product`;
}
@Injectable()
export class CategoryWiseProduct extends BaseServiceService<IProduct> {
  public baseUrl = `${domain}/getCategoryWiseProduct`;
}
@Injectable()
export class FooterService extends BaseServiceService<IFooter> {
  public baseUrl = `${domain}/footer`;
}
@Injectable()
export class ChangePasswordService extends BaseServiceService<IUsersVM> {
  public baseUrl = `${domain}/updateBati`;
}
