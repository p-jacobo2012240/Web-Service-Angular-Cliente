import { Component, OnInit } from '@angular/core';
import { ContactoService } from "../../Servicios/contacto-service.service"
import { NgForm } from "@angular/forms"
import 'rxjs/add/operator/switchMap';
import { Router,ActivatedRoute, ParamMap  } from "@angular/router"

@Component({
    selector: 'app-usuarioD',
    template: `
    <h2 class="text-center"><button class="btn btn-primary btn-sm" [routerLink]="['../../']" routerLinkActive="active">← Volver</button>Eliminar Contacto</h2>
    <div *ngIf="_data_alert.show" class="alert {{_data_alert.state}}" role="alert">
        <h3>{{_data_alert.titulo}}</h3> {{_data_alert.mensaje}}.
    </div>
    <form  (ngSubmit)="eliminarUsuario()">
        <h2 class="text-center"> 
        ¿Decea eliminar el Contacto {{data.nombre+" "+data.apellido+" ? "}} </h2>
        <button type="submit" class="btn btn-outline-danger btn-block">Remover</button>
    </form>
    `
})

export class EliminarUsuarioComponent implements OnInit {
    public data:any={
        nombre:"",
        apellido:"",
        telefono:"",
        correo:"",
        idCategoria:0,
        idContacto:0
    }

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

    eliminarUsuario(){
        console.log(this.data);
        this._contacto.deleteContacto(this.data.idContacto,(value)=>{
        if(value){
            this._data_alert.show=true;
            this._data_alert.titulo ="¡Que bien!"
            this._data_alert.mensaje="Se elimino el Contacto correctamente"
            setTimeout(()=>{
                this._router.navigate(["contactos"]);
            },2800);
        }else{
            this._data_alert.show=true;
            this._data_alert.titulo ="¡Oh oh!"
            this._data_alert.mensaje="Tenemos problemas para eliminarlo, recarga la pagina por favor"
            this._data_alert.state="alert-danger"
            }
        });
         
    }
}

