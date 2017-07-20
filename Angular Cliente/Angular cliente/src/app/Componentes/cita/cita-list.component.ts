import { Component, OnInit } from '@angular/core';
import { CitaService } from "../../Servicios/cita-service.service"

@Component({
    selector: 'app-listcita',
    template: `
        <div class="row justify-content-md-center">
            <div class="col-lg-7 col-md-10 col-sm-12">
                <button type="button" class="btn btn-block btn-outline-success" [routerLink]="['agregar']">Agregar Cita</button>
                <div class="item-box container-fluid" *ngFor="let cita of _cita.citaList">
                <div class="row">
                    <div class="col-11">
                        <h4>Cita con: {{cita.nombre +" "+ cita.apellido}}</h4> 
                    </div>
                    <div class="col-1 dropdown">
                        <button class="btn btn-secondary dropdown-toggle" style=" background: #dddddd; float: rigth;" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button type="button" class="dropdown-item" [routerLink]="['editar',cita.idCita]"><i class="fa fa-pencil" aria-hidden="true"></i> Modificar</button>
                                <button type="button" class="dropdown-item" [routerLink]="['eliminar',cita.idCita]"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>
                            </div>
                    </div>
                </div>
                    <p>Lugar: {{cita.lugar}}.</p>
                    <p>{{cita.descripcion}}.</p>
                    <p><small class="text-muted">{{ (cita.dias > 0)? "Dentro de "+cita.dias : "Hace "+(cita.dias* -1)}} dias ({{cita.fechaFormat}})</small></p>
  
            </div>
        </div>
    `
})

export class ListCitaComponent implements OnInit {
    constructor(public _cita:CitaService) { } 

    ngOnInit() {
        this._cita.getCitas().subscribe();
     }
}