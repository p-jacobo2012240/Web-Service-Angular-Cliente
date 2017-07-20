import {Component, OnInit} from '@angular/core';
import {TareaService} from "../../Servicios/tarea-service.service"
import {Route, Router, ActivatedRoute, ParamMap} from "@angular/router"
import {CategoriaService} from "../../Servicios/categoria-service.service"
import {NgForm} from "@angular/forms"

@Component({
    selector: 'app-agregarta',
    template: `
    <h1 class="text-aling"><button type="button" [routerLink]="['../']"  class="btn btn-primary">Atras </button> Agregar Tarea</h1>
        <div class="container-fluid justify-content-center">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
            </div>
            <form class="col-lg-8 col-sm-12 col-md-10" #data="ngForm" (ngSubmit)="agregarTarea(data)">
                <div class="form-group">
                    <label>Nombre de la tarea</label>
                    <input type="text" name="nombre" ngModel placeholder="Nombre de la tarea" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Prioridad</label>
                    <select class="form-control" ngModel name="idPrioridad" required>
                        <option value="{{pri.idPrioridad}}" *ngFor="let pri of _categoria.prioridadList">
                        {{pri.nombre}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Categoria</label>
                    <select class="form-control" ngModel name="idCategoria" required>
                        <option value="{{cat.idCategoria}}" *ngFor="let cat of _categoria.categoriaList">
                        {{cat.nombre}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" name="fecha" ngModel placeholder="Fecha" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Descripcion</label>
                    <textarea name="descripcion" ngModel placeholder="Descripcion" class="form-control" required>
                    </textarea>
                </div>
                <button type="submit" class="btn btn-outline-success">Agregar Tarea</button>
            </form>
        </div>
    `
})

export class AgregarTareaComponent implements OnInit {
        state ={
        show: false,
        titulo: "",
        descripcion: "",
        type: "alert-success"
    }

    constructor(private _tarea:TareaService, private _route:Router, public _categoria: CategoriaService) { }

    ngOnInit() { 
        this._categoria.getCategorias().subscribe();
        this._categoria.getPrioridad().subscribe();
    }

    agregarTarea(data:NgForm){
        if(data.valid){ 
            console.log(data)
            this._tarea.insertTarea(data.value.nombre, data.value.descripcion,data.value.idCategoria, data.value.idPrioridad, data.value.fecha, (res)=>{
                if(res){
                    this.state.show = true;
                    this.state.titulo = "¡Que bien!"
                    this.state.descripcion ="Hemos agregado una tarea exitosamente"
                    this.state.type = "alert-success"
                     setTimeout(()=> {
                        this._route.navigate(["tareas"])
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

