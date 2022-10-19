import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTmp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(private hospitalServ : HospitalService,
              private modalImgServ: ModalImagenService,
              private busquedaServ: BusquedasService) { }

  ngOnInit(): void {
    this.cargandoHospitales();
    this.imgSubs = this.modalImgServ.nuevaImagen
      .pipe(delay(100))
      .subscribe(resp => this.cargandoHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargandoHospitales() {
    
    this.cargando = true;
    this.hospitalServ.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTmp = this.hospitales;
      })
  }

  buscar(termino: string) {

    if (termino.length === 0)
    {
      return this.hospitales = this.hospitalesTmp;
    }

    return this.busquedaServ.buscar('hospitales',termino)
      .subscribe((resultados: any) => {
        this.hospitales = resultados;
      })

  }

  guardarHospital(hospital: Hospital) {
        this.hospitalServ.editarHospital(hospital.uid!,hospital.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado',hospital.nombre,'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
      this.hospitalServ.eliminarHospital(hospital.uid!)
        .subscribe( resp => {
            this.cargandoHospitales();
            Swal.fire('Eliminado',hospital.nombre,'success');
        });
  }

async abrirSweetAlert() {
  const {value = ''} = await Swal.fire<string>({
    title: 'Crear Hospital',
    text: 'Ingrese el nombre del hospital',
    input: 'text',
    inputPlaceholder: 'Nombre del Hospital',
    showCancelButton: true
  });

  if(value!.trim().length>0) {
    this.hospitalServ.crearHospital(value!)
      .subscribe((resp: any) => {
        this.cargandoHospitales();
        Swal.fire('Creado',value,'success');
      })
  }
  else {
    Swal.fire('Error Creación','Debe ingresar el nombre del hospital','warning');
  }
  
}

abrirModal(hospital: Hospital) {
  this.modalImgServ.abrirModal('hospitales', hospital.uid!, hospital.img);
}
  
}
