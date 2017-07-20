import { Component, OnInit } from '@angular/core';
import { ContactoService } from "../../Servicios/contacto-service.service"
import { NgForm } from "@angular/forms"
import 'rxjs/add/operator/switchMap';
import { Router,ActivatedRoute, ParamMap  } from "@angular/router"

@Component({
    selector: 'app-usuarioE',
    template: `
    <h2 class="text-center"><button class="btn btn-primary btn-sm" [routerLink]="['../../']" routerLinkActive="active">← Volver</button>  Editar Contacto</h2>
    <div *ngIf="_data_alert.show" class="alert {{_data_alert.state}}" role="alert">
        <h3>{{_data_alert.titulo}}</h3> {{_data_alert.mensaje}}.
    </div>
    <form  (ngSubmit)="editarUsuario()">
    <h3 class="text-center">ID: {{data.idContacto}}</h3>
        <div class="form-group">
            <label>Nombre: </label>
            <input type="text" [(ngModel)]="data.nombre" name="nombre" class="form-control"  required/>
        </div>
        <div class="form-group">
            <label>Apellido: </label>
            <input type="text" [(ngModel)]="data.apellido" name="apellido" class="form-control" required/>
        </div>
        <div class="form-group">
            <label>Telefono: </label>
            <input type="number" class="form-control" [(ngModel)]="data.telefono" name="telefono" required/>
        </div>
        <div class="form-group">
            <label>Correo: </label>
            <input type="email" class="form-control" [(ngModel)]="data.correo" name="correo" required/>
        </div>
        <div class="form-group">
            <label>Categoria: </label>
            <select class="custom-select form-control" [(ngModel)]="data.idCategoria" name="idCategoria">
                <option *ngFor="let categoria of categoriaList" value="{{categoria.idCategoria}}" required>
                    {{categoria.nombre}}
                </option>
            </select>
        </div>
        <button type="submit" class="btn btn-outline-warning btn-block">Editar</button>
    </form>
    `
})

export class UsuarioEditarComponent implements OnInit {
    public data:any={
        nombre:"",
        apellido:"",
        telefono:"",
        correo:"",
        idCategoria:0,
        idContacto:0
    }
    categoriaList:Array<any>=[
        {idCategoria:1,nombre:"Familia", idUsuario:1},
        {idCategoria:2,nombre:"Amigos", idUsuario:1}
    ]
    constructor(private _contacto:ContactoService, 
                private _route:ActivatedRoute,
                private _router:Router) { }

    public _data_alert:any={
        show: false,
        titulo: "",
        mensaje: "",
        state:"alert-success"
    }
    ngOnInit() {
        this._route.paramMap
        .switchMap((params:ParamMap)=>
        this._contacto.getAContacto(params.get("id")))
        .subscribe(user=>this.data= user[0]);
     }

    editarUsuario(){
        this._contacto.updateContacto(this.data.idContacto,this.data.nombre,this.data.apellido,
            this.data.telefono,this.data.correo,this.data.idCategoria,(value)=>{
       
        if(value){
            this._data_alert.show=true;
            this._data_alert.titulo ="¡Que bien!"
            this._data_alert.mensaje="Se edito el Contacto correctamente"
            setTimeout(()=>{
                this._router.navigate(["contactos"]);
            },2800);
        }else{
            this._data_alert.show=true;
            this._data_alert.titulo ="¡Oh oh!"
            this._data_alert.mensaje="Tenemos problemas para editarlo, recarga la pagina por favor"
            this._data_alert.state="alert-danger"
            }
        });
         
    }
}