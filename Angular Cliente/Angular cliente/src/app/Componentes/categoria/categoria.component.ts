import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent{
    constructor(private _router:Router, private _cookie:CookieService) { }

    ngOnInit() { 
        if(this._cookie.get("UDI") == null){
            this._router.navigate([""]);
        }
    }
}
