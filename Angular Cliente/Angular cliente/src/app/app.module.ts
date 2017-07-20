import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { RouterModule, Routes  } from "@angular/router"
import { CookieModule } from 'ngx-cookie';

import { UsuarioServiceService } from "./Servicios/usuario-service.service"
import { ContactoService } from "./Servicios/contacto-service.service"
import { CategoriaService } from "./Servicios/categoria-service.service"
import { TareaService } from "./Servicios/tarea-service.service"
import { CitaService } from "./Servicios/cita-service.service";

import { AppComponent } from './app.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';

import { CategoriaComponent } from './Componentes/categoria/categoria.component';
import {ListaCategoria} from "./Componentes/categoria/categoria-list.component"
import { AgregarCategoriaComponent } from "./Componentes/categoria/categoria-agregar.component";
import { EditarCategoriaComponent } from "./Componentes/categoria/categoria-editar.component";
import {EliminarCategoriaComponent} from "./Componentes/categoria/categoria-eliminar.component";
import { LoginComponent } from './Componentes/Usuario/login/login.component';
import { LoginOutComponent } from './Componentes/Usuario/login/logout.component';
import { IndexComponent } from './Componentes/index/index.component';

import { UserBodyComponent } from './Componentes/Usuario/usuario.component';
import { UsuarioAgregarComponent } from "./Componentes/Usuario/usuario-agregar.component";
import { UsuarioEditarComponent } from "./Componentes/Usuario/usuario-editar.component";
import { EliminarUsuarioComponent } from "./Componentes/Usuario/usuario-eliminar.component";
import { UsuarioListComponent } from "./Componentes/Usuario/usuario-list.component";

import { TareaComponent } from "./Componentes/tarea/tarea.componet";
import { ListaTareaComponent} from "./Componentes/tarea/tarea-list.component";
import {AgregarTareaComponent} from "./Componentes/tarea/tarea-agregar.component";
import {EditarTareaComponent} from "./Componentes/tarea/tarea-editar.component";
import {EliminarTareaComponent} from "./Componentes/tarea/tarea-eliminar.component";

import { CitaComponent } from "./Componentes/cita/cita-component.component";
import { ListCitaComponent } from "./Componentes/cita/cita-list.component";
import { AgregarCitaComponent } from "./Componentes/cita/cita-agregar.component";
import { EditarCitaComponent } from "./Componentes/cita/cita-editar.component";
import { EliminarCitaComponent } from "./Componentes/cita/cita-eliminar.component";
 
import { UsuarioPerfilComponent } from "./Componentes/Usuario/usuario-perfil.component";
import { RegistrarUsuarioComponent } from "./Componentes/Usuario/signup/signup.component";
import { RouterAPP } from "./app.routers";
 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserBodyComponent,

    AgregarCitaComponent,
    EditarCitaComponent,
    CitaComponent,
    ListCitaComponent,
    EliminarCitaComponent,

    ListaCategoria,
    CategoriaComponent,
    EditarCategoriaComponent,
    EliminarCategoriaComponent,
    AgregarCategoriaComponent,

    UsuarioListComponent,
    UsuarioAgregarComponent,
    UsuarioEditarComponent,
    EliminarUsuarioComponent,


    TareaComponent,
    ListaTareaComponent,
    AgregarTareaComponent ,
    EditarTareaComponent,
    EliminarTareaComponent,

    UsuarioPerfilComponent,
    RegistrarUsuarioComponent,
    LoginComponent,
    LoginOutComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    RouterAPP,
    CookieModule.forRoot()
  ],
  providers: [
    UsuarioServiceService,
    CategoriaService,
    CitaService,
    ContactoService,
    TareaService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
