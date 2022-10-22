import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor( private usuarioServ: UsuarioService,
               private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
        if (this.usuarioServ.role === 'ADMIN_ROLE') 
        {
          return true;
        }
        else {
          this.router.navigateByUrl('/dashboard');
          return false;
        } 
  }
  
}
