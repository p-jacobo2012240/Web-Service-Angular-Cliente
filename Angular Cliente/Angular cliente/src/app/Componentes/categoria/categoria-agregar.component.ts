import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {CategoriaService} from "../../Servicios/categoria-service.service"
import {Router} from "@angular/router"

@Component({
    selector: 'app-agregarcomponent',
    template: `
        <h1 class="text-aling"><button type="button" [routerLink]="['../']"  class="btn btn-primary btn-sm">Atras </button>Agregar Categoria</h1>
        <div class="container-fluid justify-content-center">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
            </div>
            <form class="col-lg-8 col-sm-12 col-md-10" #data="ngForm" (ngSubmit)="agregarCategoria(data)">
                <div class="form-group">
                    <label>Nombre de la Categoria</label>
                    <input type="text" name="nombre" ngModel placeholder="Nombre de la Categoria" class="form-control" required/>
                </div>
                <button type="submit" class="btn btn-outline-success">Agregar Categoria</button>
            </form>
        </div>
    `
})

export class AgregarCategoriaComponent implements OnInit {
    state ={
        show: false,
        titulo: "",
        descripcion: "",
        type: "alert-success"
    }

    constructor(private _categorias:CategoriaService, private _route:Router) { }

    ngOnInit() { }

    agregarCategoria(data:NgForm){
        if(data.valid){
            console.log(data)
            this._categorias.insertCategoria(data.value.nombre, (res)=>{
                if(res){
                    this.state.show = true;
                    this.state.titulo = "¡Que bien!"
                    this.state.descripcion ="Hemos agregado una categoria exitosamente"
                    this.state.type = "alert-success"
                     setTimeout(()=> {
                        this._route.navigate(["categorias"])
                    }, 2400);
                }else{
                    this.state.show = true;
                    this.state.titulo = "¡Oh no!"
                    this.state.descripcion ="Tenemos problemas, recarga la pagina o llama al administrador del sistema"
                    this.state.type = "alert-danger"
                }
            })
        }else{
            this.state.show = true;
            this.state.titulo = "¡HEY!"
            this.state.descripcion ="Debes llenar todos los campos"
            this.state.type = "alert-warning"
        }
    }
}