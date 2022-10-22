import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  /**
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'Gráficas', url: 'grafica1'},
        { titulo: 'Progress Bar', url: 'progress'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'RXJS', url: 'rxjs'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Hospitales', url: 'hospitales'},
        { titulo: 'Médicos', url: 'medicos'}
      ]
    }
  ]; */

  public menu = [];

  constructor() { }

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }
}
