import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
 public state= {out: true, in1:false, color: "#9b59b6"}
  constructor(private _cookies:CookieService) { }

  ngOnInit() {

  }

  getState(){
    
   if(this._cookies.get("UDI") != null){
      this.state.color="#2c3e50";
      this.state.out=false;
      this.state.in1 = true;
    }
    return (this.state.out && !this.state.in1);
  }
  getColor(){
    return this.state.color;
  }
}
