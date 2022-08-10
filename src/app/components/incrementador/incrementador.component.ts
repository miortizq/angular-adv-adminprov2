import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  ngOnInit() {
    
    this.btnClase = `btn ${this.btnClase}`;

  }

  /* Se adiciona un Input para recibir la información del Padre 
     Se puede renombrar la propiedad dando un nuevo nombre entre los paréntesis del decorador*/
  @Input('valorProgreso') progreso : number = 10;
  @Input() btnClase: string = 'btn-primary';

  /* El decorador Output cumple una funcion similar a un evento. Se encarga de emitir un valor hacia el Padre.
     Es de tipo EventEmitter */
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor: number) {
    
    if (this.progreso >= 100 && valor >=0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    
    this.valorSalida.emit(this.progreso + valor);
    return this.progreso = this.progreso + valor;
  }

  onChange( nuevoValor: number ) {
    
    if (nuevoValor > 100)
      this.progreso = 100;
    else if (nuevoValor <= 0)
      this.progreso = 0;
    else
      this.progreso = nuevoValor;
    
    this.valorSalida.emit(this.progreso);
  }

}
