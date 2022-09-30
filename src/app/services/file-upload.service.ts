import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {

    try {
      
      const url = ` ${base_url}/upload/${tipo}/${id}`;
      //Utilizando javascript se define FormData para construir el body que se manda al método
      const formData = new FormData();  
      formData.append('imagen',archivo);

      /* Utilizando javasccript se pueden hacer peticiones HTTP utilizando el fetch */
      const resp = fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token')!
        },
        body: formData
      });

      const data = await (await resp).json();

      if (data.ok) {
        return data.nombreArchivo;
      }
      else
      {
        return false;
      }

      return data;

    } catch (error) {
      console.log(error);
      return false;
    }
  }


}
