import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

   /* Obtiene deo DOM el elemento identificado con id='theme'. Para este caso es el elemento referente
     al tema de la solución y se encuentra en el archivo index.html */
     private enlaceTema = document.querySelector('#theme');

    constructor() { 
      const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
      /* Modifica el atributo 'href' del elemento 'theme' que se encuentra en el indes.html
         para asociar la url que ubica el tema y cuyo valor se encuentra en el localStorage de google */
      this.enlaceTema?.setAttribute('href',url);
    }

    changeTheme(theme: string){
      const url = `./assets/css/colors/${theme}.css`;
      this.enlaceTema?.setAttribute('href',url);
      localStorage.setItem('theme',url); 

      this.checkCurrentTheme();
    }

    checkCurrentTheme() {

      /* Usando JavaScript se solicita obtener del DOM todos los elementos de la página que implementen la clase
       selector.  Se adiciona un punto antes del nombre de la clase para indicar que es una clase.*/
        const enlaces = document.querySelectorAll('.selector');
    
        /* Se recorre la lista de elementos identificados para determinar a cuál se debe adicionar la clase
        'Working' que es la que permite presentar la caja del tema seleccionado como chequeada */
        enlaces.forEach(elem => {
          /* Primero: se debe eliminar la clase working del elemento identificado */
          elem.classList.remove('working');
          /* Segundo: Se debe obtener el valor del tema asociado a cada elemento identificado */
          const btnElem = elem.getAttribute('data-theme');
          /* Tercero: Se debe comparar el valor obtenido con el cargado actualmente en el index.html y 
              si son iguales, le asocia la clase working al elemento identificado */
          const btnThemeUrl = `./assets/css/colors/${btnElem}.css`;
          const currentTheme = this.enlaceTema?.getAttribute('href');
  
          if (btnThemeUrl === currentTheme) {
              elem.classList.add('working');
          }
      })
  
    }
}
