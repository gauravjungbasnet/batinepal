import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from 'src/app/Services/base-service.service';
import { IHeader } from 'src/app/Services/models/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {
  @Input() navId;
  headerList: IHeader[]=[];

  constructor(
    private hs: HeaderService
    
  ) { }

  ngOnInit() {
    this.getHeader();
  }
  getHeader(){
    this.hs.getAll().subscribe(res=>{
      this.headerList = res.body;
    })
  }
}
