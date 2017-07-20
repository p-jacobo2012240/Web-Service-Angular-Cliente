import { Component, OnInit } from '@angular/core';
import { ContactoService } from "../../Servicios/contacto-service.service";

@Component({
    selector: 'app-usuariolist',
    template: `
        <div class="btn-group btn-block">
            <input type="text" (change)="search()" [(ngModel)]="textSearch"/><button type="button" [routerLink]="['agregar']" routerLinkActive="active" class="btn btn-outline-primary">+</button>
        </div>

        <div *ngFor="let us of contactoServices.contactoList" class="item-box">
            <div class="row">
                <div class="col-11">
                    <h2>{{us.nombre+" "+us.apellido}}</h2>
                </div>
                <div class="col-1 dropdown">
                    <button class="btn btn-secondary dropdown-toggle" style=" background: #dddddd; float: rigth;" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button type="button" class="dropdown-item" [routerLink]="['editar',us.idContacto]"><i class="fa fa-pencil" aria-hidden="true"></i> Modificar</button>
                            <button type="button" class="dropdown-item" [routerLink]="['eliminar',us.idContacto]"><i class="fa fa-trash-o" aria-hidden="true"></i> Eliminar</button>                            
                    </div>
                </div>
            </div>
            
            <h4>Correo: <a href="mailto:{{us.correo}}">{{us.correo}}</a></h4>
            <h4>Telefono: <a href="tel:{{us.telefono}}">{{us.telefono}}</a></h4>
            <h4>Categoria: {{us.nombreCategoria}}</h4>
        </div>
    `,
    styleUrls: ["../../app.component.css"]
})

export class UsuarioListComponent implements OnInit {
    constructor(private contactoServices:ContactoService){}
    textSearch:string =""
    ngOnInit() {
        this.contactoServices.getContacto().subscribe();
    }
    search(){
        this.contactoServices.search(this.textSearch);
    }

}