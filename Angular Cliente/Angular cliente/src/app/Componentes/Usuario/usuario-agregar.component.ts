import { Component, OnInit } from '@angular/core';
import { ContactoService } from "../../Servicios/contacto-service.service"
import { CategoriaService } from "../../Servicios/categoria-service.service"
import { NgForm } from "@angular/forms"
import { Router } from "@angular/router"

@Component({
    selector: 'app-agregaru',
    template: `
    <h2 class="text-center"><button class="btn btn-primary btn-sm" [routerLink]="['../']" routerLinkActive="active">← Volver</button>  Agregar Contacto</h2>
    <div *ngIf="_data_alert.show" class="alert {{_data_alert.state}}" role="alert">
        <h3>{{_data_alert.titulo}}</h3> {{_data_alert.mensaje}}.
    </div>
    <form #data="ngForm" (ngSubmit)="agregarContacto(data)">
        <div class="form-group">
            <label>Nombre: </label>
            <input type="text" ngModel name="nombre" class="form-control"  required/>
        </div>
        <div class="form-group">
            <label>Apellido: </label>
            <input type="text" ngModel name="apellido" class="form-control" required/>
        </div>
        <div class="form-group">
            <label>Telefono: </label>
            <input type="number" class="form-control"  ngModel name="telefono" required/>
        </div>
        <div class="form-group">
            <label>Correo: </label>
            <input type="email" class="form-control" ngModel name="correo" required/>
        </div>
        <div class="form-group">
            <label>Categoria: </label>
            <select class="custom-select form-control" ngModel name="idCategoria">
                <option *ngFor="let categoria of _categoria.categoriaList" value="{{categoria.idCategoria}}" required>
                    {{categoria.nombre}}
                </option>
            </select>
        </div>
        <button type="submit" class="btn btn-outline-success btn-block">Agregar </button>
    </form>
    `
})

export class UsuarioAgregarComponent implements OnInit {
   
    constructor(private _contacto:ContactoService, private _router:Router, private _categoria:CategoriaService) { }
    public _data_alert:any={
        show: false,
        titulo: "",
        mensaje: "",
        state:"alert-success"
    }
    ngOnInit() { 
        this._categoria.getCategorias().subscribe()
    }

    agregarContacto(data:NgForm){
        console.log(data);
        if(data.valid){
        this._contacto.insertContacto(data.value.nombre,data.value.apellido,data.value.telefono,data.value.correo,data.value.idCategoria,(value)=>{
       
        if(value){
            this._data_alert.show=true;
            this._data_alert.titulo ="¡Que bien!"
            this._data_alert.mensaje="Se agrego el Contacto "
            setTimeout(()=>{
                this._router.navigate(["contactos"]);
            },2800);
        }else{
            this._data_alert.show=true;
            this._data_alert.titulo ="¡Oh oh!"
            this._data_alert.mensaje="Tenemos problemas para agregarlo, recarga la pagina por favor"
            this._data_alert.state="alert-danger"
            }
        });
         
        }else{
            this._data_alert.show=true;
            this._data_alert.titulo ="¡HEY!"
            this._data_alert.mensaje="Completa los campos"
            this._data_alert.state="alert-warning"
        }
    }
}