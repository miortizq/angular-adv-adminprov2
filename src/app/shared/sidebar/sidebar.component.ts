import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private sidebarserv: SidebarService,
              private userServ: UsuarioService) {
    this.menuItems = sidebarserv.menu;
   }

  ngOnInit(): void {
  }
  
  logout() {
    this.userServ.logout();
  }
}
