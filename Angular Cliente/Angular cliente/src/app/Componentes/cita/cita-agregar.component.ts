import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {CitaService} from "../../Servicios/cita-service.service"
import { ContactoService } from "../../Servicios/contacto-service.service"
import {Router} from "@angular/router"

@Component({
    selector: 'app-agregarcomponent',
    template: `
    <div class="row justify-content-md-center">
        <h3 class="text-center"><button type="button" [routerLink]="['../']"  class="btn btn-primary">Atras</button>  Agregar</h3>
        <div class="col-lg-8 col-sm-12 col-md-10">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
            </div>
            <form  #data="ngForm" (ngSubmit)="agregarCita(data)">
                <div class="form-group">
                    <label>Lugar</label>
                    <input type="text" name="lugar" ngModel placeholder="Lugar de la cita" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" name="fecha" ngModel placeholder="Fecha de la cita" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Hora</label>
                    <input type="time" name="hora" ngModel placeholder="Hora de la cita" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Contacto con quien citarse</label>
                    <select class="form-control" name="idContacto" ngModel>
                    <option *ngFor="let us of _contacto.contactoList" value="{{us.idContacto}}">{{us.nombre}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Descripcion</label>
                    <textarea class="form-control" name="descripcion" ngModel>
                    </textarea>
                </div>
                <button type="submit" class="btn btn-outline-success">Agregar</button>
            </form>
        </div>
    </div>
    `
})

export class AgregarCitaComponent implements OnInit {
    state ={
        show: false,
        titulo: "",
        descripcion: "",
        type: "alert-success"
    }

    constructor(private _contacto:ContactoService,private _cita:CitaService, private _route:Router) { }

    ngOnInit() {
        this._contacto.getContacto().subscribe()
     }

    agregarCita(data:NgForm){
        if(data.valid){
            var date = data.value.fecha+" "+data.value.hora+":01";
            this._cita.insertCita(data.value.lugar, data.value.descripcion, data.value.idContacto , date , (res)=>{
                if(res){
                    this.state.show = true;
                    this.state.titulo = "¡Que bien!"
                    this.state.descripcion ="Hemos agregado una cita exitosamente"
                    this.state.type = "alert-success"
                     setTimeout(()=> {
                        this._route.navigate(["citas"])
                    }, 2400)
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