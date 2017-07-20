import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";

@Component({
    selector: 'app-tarea',
    template: `
        <div class="container-fluid" style="margin: 20px;">
        <h1 class="text-center">Tareas <img src="https://cdn2.iconfinder.com/data/icons/strategy-management/512/checklist-512.png" width="65" /> </h1>
            <router-outlet></router-outlet>
        </div>
    `
})

export class TareaComponent implements OnInit {
    constructor(private _router:Router, private _cookie:CookieService) { }

    ngOnInit() { 
        if(this._cookie.get("UDI") == null){
            this._router.navigate([""]);
        }
    }
}