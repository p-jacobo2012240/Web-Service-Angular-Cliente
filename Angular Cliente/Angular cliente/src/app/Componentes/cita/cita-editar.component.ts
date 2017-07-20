import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {CitaService} from "../../Servicios/cita-service.service"
import { ContactoService } from "../../Servicios/contacto-service.service"
import {Route, Router, ActivatedRoute, ParamMap} from "@angular/router"

@Component({
    selector: 'app-agregarcomponent',
    template: `
    <div class="row justify-content-md-center">
        <h3 class="text-center"><button type="button" [routerLink]="['../../']"  class="btn btn-primary">Atras</button>  Editar</h3>
        <div class="col-lg-8 col-sm-12 col-md-10">
            <div class="alert {{state.type}}" *ngIf="state.show" role="alert">
                <h2>{{state.titulo}}</h2> {{state.descripcion}}.
            </div>
            <form  #data="ngForm" (ngSubmit)="editarCita(data)">
                <div class="form-group">
                    <label>Lugar</label>
                    <input type="text" [(ngModel)]="CitaEditar.lugar" name="lugar"  placeholder="Lugar de la cita" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Fecha</label>
                    <input type="date" [(ngModel)]="CitaEditar.fechaFormat" name="fechaFormat" placeholder="Fecha de la cita" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Hora</label>
                    <input type="time" [(ngModel)]="CitaEditar.horaFormat" name="horaFormat"  placeholder="Hora de la cita" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>Contacto con quien citarse</label>
                    <select class="form-control" [(ngModel)]="CitaEditar.idContacto" name="idContacto">
                    <option *ngFor="let us of _contacto.contactoList" value="{{us.idContacto}}">{{us.nombre}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Descripcion</label>
                    <textarea class="form-control" [(ngModel)]="CitaEditar.descripcion" name="descripcion">
                    </textarea>
                </div>
                <button type="submit" class="btn btn-outline-danger">Editar</button>
            </form>
        </div>
    </div>
    `
})

export class EditarCitaComponent implements OnInit {
    public CitaEditar = {idCita:0,lugar:"", descripcion:"",idContacto:'0', fechaFormat:'', horaFormat:''}

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
            this.CitaEditar = res[0]
        })
        setTimeout(()=> {
            console.log( this.CitaEditar); 
        }, 3000);
        
     }

    editarCita(data:NgForm){
        if(data.valid){
            var date = this.CitaEditar.fechaFormat+" "+this.CitaEditar.horaFormat+":01";
            this._cita.updateCita(this.CitaEditar.idCita,this.CitaEditar.lugar, this.CitaEditar.descripcion, this.CitaEditar.idContacto , date , (res)=>{
                if(res){
                    this.state.show = true;
                    this.state.titulo = "¡Que bien!"
                    this.state.descripcion ="Hemos editado una cita exitosamente"
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