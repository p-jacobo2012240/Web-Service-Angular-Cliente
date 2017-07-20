import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie";
import { UsuarioServiceService } from "../../Servicios/usuario-service.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-myprofile',
    template: `
    <div class="row justify-content-md-center">
    <div class="col-lg-6 col-md-8 col-sm-12">
    <h2 class="text-center"><button class="btn btn-primary btn-sm" [routerLink]="['../']" routerLinkActive="active">← Volver</button>  Perfil</h2>
    <div *ngIf="_data_alert.show" class="alert {{_data_alert.state}}" role="alert">
        <h3>{{_data_alert.titulo}}</h3> {{_data_alert.mensaje}}.
    </div>
    <form #data="ngForm" (ngSubmit)="editarProfile(data)">
        <div class="form-group">
            <label>Usuario: </label>
            <input type="text" [(ngModel)]="usuarioEdit.nick" name="nick" class="form-control"  required/>
        </div>
        <div class="form-group">
            <label>Contrasena: </label>
            <input type="password" [(ngModel)]="usuarioEdit.contrasena" name="contrasena" class="form-control" required/>
        </div>
         <div class="form-group">
            <label>Repite la Contrasena: </label>
            <input type="password" [(ngModel)]="usuarioEdit.contrasena2" name="contrasena2" class="form-control" required/>
        </div>
        <div class="form-group row">
            <div class="col-8">
            <label>Foto: </label>
            <input type="file" (change)="cargarIMG($event)" name="filePath" class="form-control"/>
            </div>
            <div class="col-4">
            <img src="{{usuarioEdit.filePath}}" style="border-radius: 4px;" width="200"/>
            </div>
        </div>
        <button type="submit" class="btn btn-outline-warning btn-block">Editar</button>
    </form>
    </div>
    </div>
    `
})

export class UsuarioPerfilComponent implements OnInit {
    usuarioEdit = {
        idUsuario: 0,
        nick:"",
        contrasena: "",
        contrasena2: "",
        filePath: "",
        file: ""
    }
     public _data_alert:any={
        show: false,
        titulo: "",
        mensaje: "",
        state:"alert-success"
    }
    constructor(private _cookie:CookieService,private _router:Router, private _usuario:UsuarioServiceService) { }

    ngOnInit() { 
        if(this._cookie.get("UDI") == null){
            this._router.navigate([""]);
        }
        this._usuario.getAUsuario(this._cookie.get("UDI")).toPromise()
        .then(res=>{
            console.log(res.json());
            
            this.usuarioEdit.nick = res.json()[0].nick
            this.usuarioEdit.contrasena = res.json()[0].contrasena
            this.usuarioEdit.idUsuario = res.json()[0].idUsuario
            this.usuarioEdit.filePath = res.json()[0].filePath
        })
    }

    cargarIMG($event){
        let file = $event.target.files[0]
        this.usuarioEdit.file = file;
    }

    editarProfile(data:NgForm){
        if(data.valid){
            if(this.usuarioEdit.contrasena == this.usuarioEdit.contrasena2){
                if(typeof this.usuarioEdit.file == "string"){
                    console.log("No se modifico la imagen");
                    
                    this.noneUploadImg()
                }else{
                     console.log("Se modifico la imagen");
                    this.onUploadImg()
                }
            }else{
            this._data_alert.show=true;
            this._data_alert.titulo ="¡Uh, pon atencion!"
            this._data_alert.mensaje="Las contraseñas no coinciden"
            this._data_alert.state="alert-warning"
            }
        }else{
            this._data_alert.show=true;
            this._data_alert.titulo ="¡HEY!"
            this._data_alert.mensaje="Completa los campos >:v"
            this._data_alert.state="alert-warning"
        }
    }
    onUploadImg(){
        this._usuario.upload(this.usuarioEdit.file).toPromise()
                .then(res=>{
                    this.usuarioEdit.filePath=res.Mensaje
                    this._usuario.editProfile(this.usuarioEdit, (res)=>{
                        if(res){
                            this._data_alert.show=true;
                            this._data_alert.titulo ="¡Que bien!"
                            this._data_alert.mensaje="Editaste tu perfil c: "
                        }else{
                            this._data_alert.show=true;
                            this._data_alert.titulo ="¡Oh oh!"
                            this._data_alert.mensaje="Tenemos problemas para editarlo, recarga la pagina por favor"
                            this._data_alert.state="alert-danger"
                        }
                    })
                })
    }
    noneUploadImg(){

        this._usuario.editProfile(this.usuarioEdit, (res)=>{
             if(res){
                this._data_alert.show=true;
                this._data_alert.titulo ="¡Que bien!"
                this._data_alert.mensaje="Editaste tu perfil c: "
            }else{
                this._data_alert.show=true;
                this._data_alert.titulo ="¡Oh oh!"
                this._data_alert.mensaje="Tenemos problemas para editarlo, recarga la pagina por favor"
                this._data_alert.state="alert-danger"
            }
        })
    }
}