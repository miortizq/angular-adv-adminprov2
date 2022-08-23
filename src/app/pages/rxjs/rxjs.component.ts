import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {


  public intervalSubs: Subscription;

  constructor()
  { 
    /* El Observable no se ejecuta hasta que no es suscrito a través de la instrucción subscribe 
       El subscribe implementa 3 argumentos : next cuando se obtiene el valor, error cuando se
       presenta un error en el observable y complete cuando el observable se finaliza.
       Para utilizar el método retry, se puede implementar en el operador Pipe del Observable.
       El valor del argumento del Retry, indica la cantidad de intentos que se van a ejecutar */
    //this.retornaObservable()
    //.pipe(
    //  retry(1)
    //)
    //.subscribe(
    //    valor => console.log('Subs: ', valor),          //next
    //    error => console.error('Error subs: ', error),   //error
    //    () => console.warn('Obs finalizado')            //complete - no recibe argumentos y se define con los parentesis
    //);

    this.intervalSubs = this.retornaIntervalo()
      .subscribe( valor => {
        console.log(valor);
      })
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500)
            .pipe(
              map( valor => valor + 1 ),  //Este operador transforma la salida del Observable en un nuevo valor
              //return 'Hola mundo ' + valor;
              filter( valor => (valor % 2 === 0) ? true : false), //Filtra la información que sera emitida
              take(10),          //Este operador indica la cantidad de emisiones del observable
            );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    
    /* Se crea el observable de manera manual. Se declara el argumento observer en el callBack del Observable
       Se está definiendo la función setInterval propoa de javascript que ejecuta alguna instrucción 
       de manera indefinida cada 1000 milisegundos */
    const obs$ = new Observable<number>( observer => {

      /* Se asocia la función a una constante para tener la posibilidad de manipular el intervalo
         y eventualmente cancelarlo */
      const intervalo = setInterval( () => {
        
        /* Se define la variable i para determinar un valor que será emitido cuando se subscriba el
           observable. La instrucción next es la encargada de emitir el valor */
        i++;
        observer.next(i);

        if (i == 4){
          clearInterval(intervalo);
          observer.complete();
        }

        /* Se forza a error para presentar el mensaje de error generado cuando se activa en el subscribe
           el error */
        if (i == 2) {
          //i= -1;
          observer.error( 'Error porque llego a 2');
        }


      }, 1000 );
    });

    return obs$;
  }


}
