import {Component, OnInit} from '@angular/core';
import {TareaService} from "../../Servicios/tarea-service.service"
import {Route, Router, ActivatedRoute, ParamMap} from "@angular/router"
import {CategoriaService} from "../../Servicios/categoria-service.service"
import {NgForm} from "@angular/forms"

@Component({
    selector: 'app-eliminarta',
    template: `
    <h1 class="text-center"><button type="button" [routerLink]="['../../']"  class="btn btn-primary">Atras </button> Editar Tarea</h1>

        <div class="container-fluid justify-content-center">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
        </div>

        <form class="col-lg-8 col-sm-12 col-md-10" (ngSubmit)="eliminarTarea()">
            <div class="form-group">
                <h3 class="text-center">¿Decea eliminar la tarea {{ TareaEliminar.nombre }}?</h3>
            </div>
            <button type="submit" class="btn btn-outline-success">Eliminar Tarea</button>
        </form>
    `
})

export class EliminarTareaComponent implements OnInit {
        state ={
        show: false,
        titulo: "",
        descripcion: "",
        type: "alert-success"
    }

    public TareaEliminar:any = {
        idTarea:0,
        nombre: '',
        descripcion: '',
        idCategoria: 0,
        idPrioridad: 0,
        idUsuario: 0,
        fecha: ''
    }

    constructor(private _activate_router:ActivatedRoute,private _tarea:TareaService, private _route:Router, public _categoria: CategoriaService) { }

    ngOnInit() { 
        this._categoria.getCategorias().subscribe();
        this._categoria.getPrioridad().subscribe();
        this._activate_router.paramMap.switchMap((params:ParamMap)=>this._tarea.getATareas(params.get("id"))).subscribe(res=>{
            this.TareaEliminar = res[0]
        })
    }

    eliminarTarea(){
        this._tarea.deleteTarea(this.TareaEliminar.idTarea, (res)=>{
        if(res){
            this.state.show = true;
            this.state.titulo = "¡Que bien!"
            this.state.descripcion ="Hemos Elimino una tarea exitosamente"
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
    }
}