import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  private transformarHospital( resultados: any[]): Hospital[] {

    return resultados.map(
      hosp => new Hospital(hosp.nombre,hosp.uid, hosp.img, hosp.usuario )
    );
  }

  private transformarMedico( resultados: any[]): Medico[] {

    return resultados.map(
      medico => new Medico(medico.nombre, medico.uid, medico.img, medico.usuario, medico.hospital)
    );
  }

  buscar( 
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string ) {

    const url = `${ baseUrl }/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map ( (resp: any) => {
          if (tipo==='usuarios')
          {
              return this.transformarUsuario(resp.resultados);
          }
          else if(tipo==='hospitales') 
          {
            return this.transformarHospital(resp.resultados);
          }
          else if(tipo==='medicos') 
          {
            return this.transformarMedico(resp.resultados);
          }
          else {
            return [];
          }

        })
      )

  }
}
