import { Component, Input, OnInit } from '@angular/core';
import { ChartData} from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: []
})
export class DonaComponent implements OnInit {
  
  @Input() titulo: string = 'Sin Título';
  @Input() etiquetas: string[] = [];
  @Input() datos: number[] = []; 
  @Input() colores: string[] = [];

  public doughnutChartLabels: string[] = this.etiquetas;
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.datos,
        backgroundColor: ['#42FF33','#33FFC4','#334FFF']}
    ]
  }

  ngOnInit() {
    this.doughnutChartLabels = this.etiquetas;
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.datos,
          backgroundColor: this.colores}
      ]
    }

  }

}
