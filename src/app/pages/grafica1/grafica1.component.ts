import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: 'grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public dataVentas: number[] = [ 350, 450, 100 ];
  public labelsVentas: string[] = [ 'En línea', 'Almacen', 'Por correo' ];
  public dataCompras: number[] = [ 400, 700, 120 ];
  public dataSinTitulo: number[] = [ 100, 200, 300 ];
  public dataIngresos: number[] = [ 1500, 7000, 4000 ];

  public coloresVentas: string[] = ['#42FF33','#33FFC4','#334FFF'];
  public coloresCompras: string[] = [ '#FCCF35','#E0A62F','#F7A840' ];
  public coloresSinTitulo: string[] = [ '#51CE3C','#E0D036','#E03F36'];
  public coloresIngresos: string[] = [ '#51CEAF','#BEE036','#F7A848' ];

  

}
