import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../../Servicios/categoria-service.service"

@Component({
    selector: 'app-listac',
    template: `
    <div class="row justify-content-md-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
        <button type="button" class="btn btn-outline-success btn-block"  [routerLink]="['agregar']" routerLinkActive="active">Agregar Categorias</button>
            <div *ngFor="let cat of categorias.categoriaList" class="item-box">
                <div class="row">
                    <div class="col-11">
                        <h2>Nombre: {{cat.nombre}}</h2>
                    </div>
                    <div class="col-1 dropdown">
                        <button class="btn btn-secondary dropdown-toggle" style=" background: #dddddd; float: rigth;" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button type="button" class="dropdown-item" [routerLink]="['editar',cat.idCategoria]"><i class="fa fa-pencil" aria-hidden="true"></i> Modificar</button>
                                <button type="button" class="dropdown-item" [routerLink]="['eliminar',cat.idCategoria]"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                            </div>
                    </div>
                </div>
                <p>ID: {{cat.idCategoria}}</p>
            </div>
        </div>
    </div>
    `
})

export class ListaCategoria implements OnInit {
    constructor(public categorias:CategoriaService) { }

    ngOnInit() { 
        this.categorias.getCategorias().subscribe()
    }
}