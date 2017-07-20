import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {CategoriaService} from "../../Servicios/categoria-service.service"
import { Router,ActivatedRoute, ParamMap  } from "@angular/router"

@Component({
    selector: 'app-eliminarc',
    template: `
        <div class="container-fluid justify-content-center">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
            </div>
            <h1 class="text-align"> Eliminar Categoria</h1>
            <form  class="col-lg-8 col-sm-12 col-md-10" (ngSubmit)="eliminarCategoria()">
                <h2 class="text-align">¿Desea eliminar la categoria {{categoriaEdit.nombre}}?</h2>
                <button type="button" [routerLink]="['../../']"  class="btn btn-outline-primary btn-sm">Atras</button>
                <button type="submit" class="btn btn-outline-danger">Eliminar Categoria</button>
            </form>
        </div>
    `
})

export class EliminarCategoriaComponent implements OnInit {
    state ={
        show: false,
        titulo: "",
        descripcion: "",
        type: "alert-success"
    }
    constructor(private _categorias:CategoriaService, private _route:Router, private _active_route:ActivatedRoute) { }
    public categoriaEdit={idCategoria:0, nombre: "", idUsuario:0}
    ngOnInit() {
        this._active_route.paramMap
        .switchMap((param:ParamMap)=>this._categorias.getACategorias(param.get("id")))
        .subscribe(categori=> {this.categoriaEdit =categori[0]; console.log(categori)})
     }

    eliminarCategoria(){
            this._categorias.deleteCategoria(this.categoriaEdit.idCategoria, (res)=>{
                if(res){
                    this.state.show = true;
                    this.state.titulo = "¡Que bien!"
                    this.state.descripcion ="Hemos elimino una categoria exitosamente"
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
    }
}