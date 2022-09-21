import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginDefForm } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';

declare const google: any;
//declare const gapi: any;

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {

  }

  logout () {
    localStorage.removeItem('token');
    //google.accounts.id.revoke('miortizq@gmail.com' , () => {

    console.log(google.accounts.id.storeCredential );

    google.accounts.id.revoke('miortizq@gmail.com' , () => {
    
    //this.auth2.signOut().then( () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
        
      });
  }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token' : token
      }
      }).pipe(
        tap((resp: any) => {
          localStorage.setItem('token',resp.token);
        }),
        map (resp => true),
        /* EL operador of crea un observable del tipo que se indica en el paréntesis */
        catchError( error => of(false))
      )
  }

  crearUsuario( formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`,formData)
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token',resp.token)
              })
            )
  }

  /* Recordar que el argumento TAP es para ejecutar un efecto secundario */
  login( loginData: LoginDefForm) {
    return this.http.post(`${baseUrl}/login`,loginData)
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token',resp.token)
            })
          )
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`,{token})
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token',resp.token)
            })
          );
  }
  
}
