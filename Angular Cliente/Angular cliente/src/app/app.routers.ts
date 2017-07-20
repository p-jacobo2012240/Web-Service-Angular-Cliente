import { Routes, RouterModule  } from "@angular/router";

import { CategoriaComponent } from "./Componentes/categoria/categoria.component";
import { AgregarCategoriaComponent } from "./Componentes/categoria/categoria-agregar.component"
import { EditarCategoriaComponent } from "./Componentes/categoria/categoria-editar.component"
import {EliminarCategoriaComponent} from "./Componentes/categoria/categoria-eliminar.component";
import {ListaCategoria} from "./Componentes/categoria/categoria-list.component"

import { LoginComponent } from "./Componentes/Usuario/login/login.component";
import { LoginOutComponent } from './Componentes/Usuario/login/logout.component';

import { UsuarioListComponent } from "./Componentes/Usuario/usuario-list.component";
import { UserBodyComponent } from "./Componentes/Usuario/usuario.component";
import { UsuarioAgregarComponent } from "./Componentes/Usuario/usuario-agregar.component";
import { UsuarioEditarComponent } from "./Componentes/Usuario/usuario-editar.component";
import { EliminarUsuarioComponent } from "./Componentes/Usuario/usuario-eliminar.component";

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

import {IndexComponent} from "./Componentes/index/index.component";

import { UsuarioPerfilComponent } from "./Componentes/Usuario/usuario-perfil.component";
import { RegistrarUsuarioComponent } from "./Componentes/Usuario/signup/signup.component";

const APP_ROUTER:Routes = [

    { path:"citas", component: CitaComponent,
    children: [
        { path: "agregar", component: AgregarCitaComponent},
        { path: '', component: ListCitaComponent },
        { path: 'editar/:id', component: EditarCitaComponent },
        { path: 'eliminar/:id', component: EliminarCitaComponent }
    ]
     },
    { path:"categorias", component: CategoriaComponent,
    children: [
        { path: "agregar", component: AgregarCategoriaComponent},
        { path: '', component: ListaCategoria },
        { path: 'editar/:id', component: EditarCategoriaComponent },
        { path: 'eliminar/:id', component: EliminarCategoriaComponent }
    ]
     },

    { path:"tareas", component: TareaComponent,
    children: [
        { path: "agregar", component: AgregarTareaComponent},
        { path: '', component: ListaTareaComponent },
        { path: 'editar/:id', component: EditarTareaComponent },
        { path: 'eliminar/:id', component: EliminarTareaComponent }
    ]
     },

    { path: "autenticar", component: LoginComponent},
    { path: "salir", component: LoginOutComponent},
    { path: "registrar", component: RegistrarUsuarioComponent},
    
    { path: "yo", component: UsuarioPerfilComponent},
    { path: "", component: IndexComponent},

    { path: "contactos", component: UserBodyComponent, 
    children: [
        { path: "editar/:id", component: UsuarioEditarComponent},
        { path: "agregar", component: UsuarioAgregarComponent},
        { path: "", component:UsuarioListComponent },
        { path: "eliminar/:id", component: EliminarUsuarioComponent}

    ]},
]

export const RouterAPP = RouterModule.forRoot(APP_ROUTER);