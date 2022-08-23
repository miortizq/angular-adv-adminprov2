import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(resp => console.log(resp));
    
    /* Se definen los parámetros resolve y reject, que son de este tipo, y  
    const promesa = new Promise( (resolve, reject) => {
      /* El resolve es la función que resuelve la respuesta de la promesa cuando sale bien
         El reject es la función que resuelve la respuesta de la promesa cuando sale mal 
        if (true) {
          resolve("hello world ");
        }
        else
        {
          reject("algo se churretio");
        }
         
    });

    promesa
      .then( () => {
        console.log('Estoy resolviendo la promesa');
      })
      .catch( error => console.log('Error en la promesa. ', error));

    console.log('Fin de los tiempos'); */

    this.getUsuarios();
  }

  getUsuarios()  {    
    return new Promise( resolve => 
    fetch('https://reqres.in/api/users?page=2')
      .then( resp => resp.json()
      .then( body => resolve(body.data))));
  }
}
