import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor ( private userServ:  UsuarioService,
                private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.userServ.validarToken()
      .pipe(
        tap( estaAutenticado => {

          if (!estaAutenticado) 
          {
            this.router.navigateByUrl('/login');
          }
        })
      );

    }
  
}
