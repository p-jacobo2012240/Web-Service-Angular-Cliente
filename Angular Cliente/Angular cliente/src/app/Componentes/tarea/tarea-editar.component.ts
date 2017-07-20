import {Component, OnInit} from '@angular/core';
import {TareaService} from "../../Servicios/tarea-service.service"
import {Route, Router, ActivatedRoute, ParamMap} from "@angular/router"
import {CategoriaService} from "../../Servicios/categoria-service.service"
import {NgForm} from "@angular/forms"

@Component({
    selector: 'app-editar',
    template: `
    <h1 class="text-center"><button type="button" [routerLink]="['../../']"  class="btn btn-primary">Atras </button> Editar Tarea</h1>

        <div class="container-fluid justify-content-center">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
        </div>

            <form class="col-lg-8 col-sm-12 col-md-10" #data="ngForm" (ngSubmit)="editarTarea(data)">
                <div class="form-group">
            <h3 class="text-center">ID: {{ TareaEditar.idTarea }}</h3>
                    <label>Nombre de la tarea</label>
                    <input type="text" name="nombre" [(ngModel)]="TareaEditar.nombre" placeholder="Nombre de la tarea" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Prioridad</label>
                    <select class="form-control" [(ngModel)]="TareaEditar.idPrioridad" name="idPrioridad" required>
                        <option value="{{pri.idPrioridad}}" *ngFor="let pri of _categoria.prioridadList">
                        {{pri.nombre}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Categoria</label>
                    <select class="form-control" [(ngModel)]="TareaEditar.idCategoria" name="idCategoria" required>
                        <option value="{{cat.idCategoria}}" *ngFor="let cat of _categoria.categoriaList">
                        {{cat.nombre}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" name="fecha" [(ngModel)]="TareaEditar.fechaFormat" placeholder="Fecha" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Descripcion</label>
                    <textarea name="descripcion" [(ngModel)]="TareaEditar.descripcion" placeholder="Descripcion" class="form-control" required>
                    </textarea>
                </div>
                <button type="submit" class="btn btn-outline-success">Editar Tarea</button>
            </form>
        </div>
    `
})

export class EditarTareaComponent implements OnInit {
        state ={
        show: false,
        titulo: "",
        descripcion: "",
        type: "alert-success"
    }

    public TareaEditar:any = {
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
            this.TareaEditar = res[0]
        })
    }

    editarTarea(data:NgForm){
        if(data.valid){ 
            console.log(data)
            this._tarea.updateTarea(this.TareaEditar.idTarea,this.TareaEditar.nombre, this.TareaEditar.descripcion,this.TareaEditar.idCategoria, this.TareaEditar.idPrioridad,this.TareaEditar.fecha, (res)=>{
                if(res){
                    this.state.show = true;
                    this.state.titulo = "¡Que bien!"
                    this.state.descripcion ="Hemos editar una tarea exitosamente"
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

