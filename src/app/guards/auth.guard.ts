import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor ( private userServ:  UsuarioService,
                private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
