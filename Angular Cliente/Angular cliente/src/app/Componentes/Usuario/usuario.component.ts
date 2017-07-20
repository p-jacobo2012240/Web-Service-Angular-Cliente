import{Component, OnInit} from "@angular/core";
import{NgForm} from "@angular/forms";
import{UsuarioListComponent} from "./usuario-list.component"
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";

@Component({
    selector: "user-body",
    templateUrl: "usuario.component.html"
})

export class UserBodyComponent implements OnInit{
    constructor(private _router:Router, private _cookie:CookieService) { }

    ngOnInit() { 
        if(this._cookie.get("UDI") == null){
            this._router.navigate([""]);
        }
    }
}