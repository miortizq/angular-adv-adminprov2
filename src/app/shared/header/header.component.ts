import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario!: Usuario;

  constructor(private userServ : UsuarioService,
              private router: Router) { 
    this.usuario = userServ.usuario;
  }

  logout() {
    this.userServ.logout();
  }

  buscar(termino: string) {
    
    if (termino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
