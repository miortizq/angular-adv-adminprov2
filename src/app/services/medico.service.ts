import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';


const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || ''
  }

  get headers() {
    return {headers: {
      'x-token' : this.token
    }}
  }

  cargarMedicos(){
    const url = `${ baseUrl }/medicos`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: any) => resp.medicos)
      );
  } 

  cargarMedicoById(_id: string){
    const url = `${ baseUrl }/medicos/${_id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: any) => resp.medico)
      );
  } 

  crearMedico(medico: {nombre: string, hospital: string}){

    const url = `${ baseUrl }/medicos`;
    return this.http.post(url, medico, this.headers);
      
  }

  editarMedico(medico: Medico){

    const url = `${ baseUrl }/medicos/${medico.uid}`;
    return this.http.put(url, medico, this.headers);
      
  }

  eliminarMedico(_id: string){

    const url = `${ baseUrl }/medicos/${_id}`;
    return this.http.delete(url, this.headers);
      
  }

}
