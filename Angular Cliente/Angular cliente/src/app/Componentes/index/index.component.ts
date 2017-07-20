import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { UsuarioServiceService } from '../../Servicios/usuario-service.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  nombre:string;
  imgSRC:string="https://us.123rf.com/450wm/alexwhite/alexwhite1506/alexwhite150603550/41094102-calendar-flat-icon-organizer-sign-agenda-symbol.jpg";
  constructor(private _cookie:CookieService, public _usuario:UsuarioServiceService) { }

  ngOnInit() {
    if(this._cookie.get("UNA") != null){
      this.nombre = this._cookie.get("UNA");
      this._usuario.getHistorial(this._cookie.get("UDI")).subscribe();
      this.imgSRC = localStorage.getItem("filePath");
    }
  }

}
