import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          /* Se pueden asociar valores adicionales a la definición de las rutas utilizando el atributo
             data:{} */
          { path: '', component: DashboardComponent, data : {titulo: 'Dashboard'}},
          { path: 'progress', component: ProgressComponent, data : {titulo: 'Progress'} },
          { path: 'grafica1', component: Grafica1Component, data : {titulo: 'Gráfica1'} }, 
          { path: 'account-settings', component: AccountSettingsComponent, data : {titulo: 'Temas'} },
          { path: 'promesas', component: PromesaComponent, data : {titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data : {titulo: 'RXJS'} },
          { path: 'perfil', component: PerfilComponent, data : {titulo: 'Perfil'} }
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
