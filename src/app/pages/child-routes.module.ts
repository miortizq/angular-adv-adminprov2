import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const childRoutes: Routes = [
  /* Se pueden asociar valores adicionales a la definición de las rutas utilizando el atributo data:{} */
  { path: '', component: DashboardComponent, data : {titulo: 'Dashboard'}},
  { path: 'account-settings', component: AccountSettingsComponent, data : {titulo: 'Temas'} },
  { path: 'buscar/:termino', component: BusquedaComponent, data : {titulo: 'Busquedas'} },
  { path: 'grafica1', component: Grafica1Component, data : {titulo: 'Gráfica1'} }, 
  { path: 'perfil', component: PerfilComponent, data : {titulo: 'Perfil'} },          
  { path: 'progress', component: ProgressComponent, data : {titulo: 'Progress'} },
  { path: 'promesas', component: PromesaComponent, data : {titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data : {titulo: 'RXJS'} },

  //Mantenimientos
  //El valor del path debe coincidir con el valor de la URL definido en el servicio 
  { path: 'hospitales', component: HospitalesComponent, data : {titulo: 'Mantenimiento de Hospitales'} },
  { path: 'medicos', component: MedicosComponent, data : {titulo: 'Mantenimiento de Médicos'} },
  { path: 'medicos/:id', component: MedicoComponent, data : {titulo: 'Mantenimiento de Médico'} },

  //Rutas de Admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data : {titulo: 'Mantenimiento de Usuarios'} }
  ];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})

export class ChildRoutesModule { }
