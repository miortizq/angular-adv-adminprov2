import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario!: Usuario;

  constructor(private userServ : UsuarioService) { 
    this.usuario = userServ.usuario;
  }

  logout() {
    this.userServ.logout();
  }

}
