import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return {headers: {
      'x-token' : this.token
    }}
  }

  private transformarUsuario( resultados: any[]): Usuario[]{

    return resultados.map(
      user => new Usuario(user.nombre,user.email,'',user.role,user.uid,user.google,user.img )
    );
  }

  buscar( 
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string ) {

    const url = `${ baseUrl }/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map ( (resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuario(resp.resultados);


            default:
              return [];
          }

        })
      )

  }
}
