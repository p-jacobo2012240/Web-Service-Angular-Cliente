import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";

@Component({
    selector: 'app-citac',
    template: `
        <h1 class="text-center">Citas <img src="http://icon-icons.com/icons2/603/PNG/512/heart_love_valentines_relationship_dating_date_icon-icons.com_55985.png" width="65" /></h1>
        <div class="container-fluid">
            <router-outlet>
            <h1><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Cargando...</span></h1>
            </router-outlet>
        </div>
    `
})

export class CitaComponent implements OnInit {
    constructor(private _router:Router, private _cookie:CookieService) { }

    ngOnInit() { 
        if(this._cookie.get("UDI") == null){
            this._router.navigate([""]);
        }
    }
}