import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import {NgForm } from "@angular/forms";
import {UsuarioServiceService} from "../../../Servicios/usuario-service.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  template: '<h1>Espera un momento..-</h1>'
})
export class LoginOutComponent implements OnInit{
  constructor(private _cookieService:CookieService, private _userHttp:UsuarioServiceService, private router:Router) { }

  ngOnInit() {
    this._cookieService.removeAll()
    window.localStorage.clear()
    this.router.navigate([""]);
    window.location.reload();
  }
 
}
