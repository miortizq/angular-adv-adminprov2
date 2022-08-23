import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

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
    }
  ];

  constructor() { }
}
