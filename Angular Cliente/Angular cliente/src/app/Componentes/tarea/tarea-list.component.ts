import {Component, OnInit} from '@angular/core';
import {TareaService} from "../../Servicios/tarea-service.service"
import {Route, Router, ActivatedRoute, ParamMap} from "@angular/router"
import {CategoriaService} from "../../Servicios/categoria-service.service"
import {NgForm} from "@angular/forms"

@Component({
    selector: 'app-lista',
    template: `
    <div class="row justify-content-md-center">
    <div class="col-lg-7 col-md-10 col-sm-12">
    <button type="button" class="btn btn-outline-success btn-block"  [routerLink]="['agregar']" routerLinkActive="active">Agregar Tarea</button>
        <div *ngFor="let ta of _tarea.tareaList" class="item-box">
            <div class="row">
                <div class="col-11">
                    <h2>Nombre: {{ta.nombre}}</h2>
                </div>
                <div class="col-1 dropdown">
                    <button class="btn btn-secondary dropdown-toggle" style=" background: #dddddd; float: rigth;" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button type="button" class="dropdown-item" [routerLink]="['editar',ta.idTarea]"><i class="fa fa-pencil" aria-hidden="true"></i> Modificar</button>
                            <button type="button" class="dropdown-item" [routerLink]="['eliminar',ta.idTarea]"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>                            
                    </div>
                </div>
            </div>
            <h4>Prioridad: {{ta.nombrePrioridad}}</h4>
            <h4>Categoria: {{ta.nombreCategoria}}</h4>
            <h4>fecha: {{ta.fechaFormat}}</h4>
            <p>{{ta.descripcion}}</p>
        </div>
    </div>
    </div>
    `
})

export class ListaTareaComponent implements OnInit {
    constructor(public _tarea:TareaService) { }

    ngOnInit() {
        this._tarea.getTareas().subscribe();
       setTimeout(()=>{
            console.log(this._tarea.tareaList);
       }, 2100);
     }
}

