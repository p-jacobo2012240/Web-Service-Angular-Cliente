import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import {NgForm } from "@angular/forms";
import {UsuarioServiceService} from "../../../Servicios/usuario-service.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["../../../app.component.css"]
})
export class LoginComponent implements OnInit{
  estado= {show:false, type:"alert-danger", title:"", mensaje:""}
  constructor(private _cookieService:CookieService, private _userHttp:UsuarioServiceService, private router:Router) { }

  ngOnInit() {
   if(this._cookieService.get("UDI") != null){
            this.router.navigate([""]);
    }
  }
  private getCookie(key: string){
    return this._cookieService.get(key);
  }

  private setCookie(key: string, value: string){
    this._cookieService.put(key, value)
  }

  autenticar(data:NgForm):void{
    this._userHttp.getToken(data.value.USAU, data.value.PSAU, ()=>{
      this._userHttp.authUser(data.value.USAU, data.value.PSAU, (data)=>{
        if(data.auth){
          this.setCookie("UDI", data.data.idUsuario);
          this.setCookie("UNA", data.data.nick);
          localStorage.setItem("filePath", data.data.filePath);
          this.estado.type="alert-success"
          this.estado.show= true;
          this.estado.title="Datos correctos c: "
          this.estado.mensaje = "Te estamos redireccionando, espera un momento"
          this.router.navigateByUrl("/");
        }else{
          this.estado.show= true;
          this.estado.title="Datos incorrectos :c "
          this.estado.mensaje = "Usuario o contraseña incorrecto "
        }
      });
    })
  }
 
}
