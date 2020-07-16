import { Component, OnInit } from '@angular/core';
import {  OurTeamService } from 'src/app/Services/base-service.service';
import { IOurService, IOurTeam } from 'src/app/Services/models/model';
import { NgxSpinnerService } from 'ngx-spinner';

import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css'],
  providers:[OurTeamService]
})
export class OurTeamComponent implements OnInit {
  public mainURL: string;

public osObj: IOurTeam[] = [];

  constructor(private os: OurTeamService,
    private ss:NgxSpinnerService) {
      this.mainURL = environment.baseUrl;
      this.mainURL = this.mainURL.replace('/api','/files'); }

  ngOnInit() {
    this.ss.show();
  this.getOS();
  }

  getOS(){
    this.os.getAll().subscribe(res=>{
      this.osObj = res.body;
      this.ss.hide();
    },err=>{
      this.ss.hide();
    });
  }

}
