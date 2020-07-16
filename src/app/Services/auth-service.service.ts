import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { domain } from './base-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,
    private router: Router
    ) { }

    logIn(loginData:any){
      var url = `${domain}/login`;
        return this.http.post(url, loginData);
      }
    
      getUserDetails(tokenData: any){
        var url = `${domain}/details`;
        var headers = new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokenData.success.token
        });
        return this.http.get(url,{headers: headers});
      }
    
      logOut() {
        localStorage.clear();
        this.router.navigate(['/bati-login']);
      }
}


