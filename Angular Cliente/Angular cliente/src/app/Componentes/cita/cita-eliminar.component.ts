import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {CitaService} from "../../Servicios/cita-service.service"
import { ContactoService } from "../../Servicios/contacto-service.service"
import {Route, Router, ActivatedRoute, ParamMap} from "@angular/router"

@Component({
    selector: 'app-eliminarci',
    template: `
    <div class="row justify-content-md-center">
        <h3 class="text-center"><button type="button" [routerLink]="['../../']"  class="btn btn-primary">Atras</button>  Eliminar</h3>
        <div class="col-lg-8 col-sm-12 col-md-10">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
            </div>
            <form (ngSubmit)="eliminarCita()">
                <h3>¿Decea eliminar la cita con {{CitaEliminar.nombre}} con fecha de {{CitaEliminar.fechaFormat}}?</h3>
                <button type="submit" class="btn btn-outline-danger">Eliminar</button>
            </form>
        </div>
    </div>
    `
})

export class EliminarCitaComponent implements OnInit {
    public CitaEliminar = {idCita:0,lugar:"", descripcion:"",idContacto:'0', fechaFormat:'', horaFormat:''}

    state ={
        show: false,
        titulo: "",
        descripcion: "",
        type: "alert-success"
    }

    constructor(private _activate_router:ActivatedRoute,private _contacto:ContactoService,private _cita:CitaService, private _route:Router) { }

    ngOnInit() {
        this._contacto.getContacto().subscribe()
        this._activate_router.paramMap.switchMap((params:ParamMap)=>this._cita.getACita(params.get("id"))).subscribe(res=>{
            this.CitaEliminar = res[0]
        })
     }

    eliminarCita(){
            var date = this.CitaEliminar.fechaFormat+" "+this.CitaEliminar.horaFormat+":01";
            this._cita.deleteCita(this.CitaEliminar.idCita, (res)=>{
               if(res){
                   this.state.show = true;
                   this.state.titulo = "¡Que bien!"
                   this.state.descripcion ="Hemos eliminado una cita exitosamente"
                   this.state.type = "alert-success"                     
                   setTimeout(()=> {
                        this._route.navigate(["citas"])
                    }, 2400)
            }else{
                this.state.show = true;
                this.state.titulo = "¡Oh no!" 
                this.state.descripcion ="Tenemos problemas, recarga la pagina o llama al administrador del sistema";
                this.state.type = "alert-danger"
            }
        })
    }
}