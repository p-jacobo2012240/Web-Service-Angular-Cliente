import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {CategoriaService} from "../../Servicios/categoria-service.service"
import { Router,ActivatedRoute, ParamMap  } from "@angular/router"

@Component({
    selector: 'app-editarc',
    template: `
        <div class="container-fluid justify-content-center">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
            </div>
            <h1 class="text-align"> <button type="button" [routerLink]="['../../']"  class="btn btn-primary btn-sm">Atras </button>Editar Categoria</h1>
            <form #data="ngForm" class="col-lg-8 col-sm-12 col-md-10" (ngSubmit)="editarCategoria(data)">
                <h3 class="text-aligm">ID: {{categoriaEdit.idCategoria}}</h3>
                <div class="form-group">
                    <label>Nombre de la Categoria</label>
                    <input type="text" name="nombre" [(ngModel)]="categoriaEdit.nombre" placeholder="Nombre de la Categoria" class="form-control" required/>
                </div>
                <button type="submit" class="btn btn-outline-success">Editar Categoria</button>
            </form>
        </div>
    `
})

export class EditarCategoriaComponent implements OnInit {
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

    editarCategoria(data:NgForm){
        if(data.valid){
            this._categorias.updateCategoria(this.categoriaEdit.nombre, this.categoriaEdit.idCategoria, (res)=>{
                if(res){
                    this.state.show = true;
                    this.state.titulo = "¡Que bien!"
                    this.state.descripcion ="Hemos editado una categoria exitosamente"
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
