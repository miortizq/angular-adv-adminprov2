import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public medicosTmp: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(private medicoServ: MedicoService,
              private busquedaServ: BusquedasService,
              private modalImgServ: ModalImagenService) { }

  ngOnInit(): void {
    this.cargandoMedicos();
    this.imgSubs = this.modalImgServ.nuevaImagen
      .pipe(delay(100))
      .subscribe(resp => this.cargandoMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargandoMedicos()
  {
    this.cargando = true;
    this.medicoServ.cargarMedicos()
        .subscribe(medicos => {
          this.cargando = false;
          this.medicos = medicos;
          this.medicosTmp = this.medicos;
        })
  }

  buscar(termino: string) {

    if (termino.length === 0)
    {
      return this.medicos = this.medicosTmp;
    }

    return this.busquedaServ.buscar('medicos',termino)
      .subscribe((resultados: any) => {
        this.medicos = resultados;
      })

  }

  guardarMedico(medico: Medico) {
      this.medicoServ.editarMedico(medico)
    .subscribe( resp => {
      Swal.fire('Actualizado',medico.nombre,'success');
    });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Eliminar Médico?',
      text: `Está a punto de eliminar al medico ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminadle!'
    }).then((result) => {
      if (result.value) {
        this.medicoServ.eliminarMedico(medico.uid!)
          .subscribe(resp => 
              {
                this.cargandoMedicos();
                Swal.fire('Eliminado!',`El médico ${ medico.nombre} ha sido eliminado.`,'success')
              }  
          );
      }
    })
  }

  abrirModal(medico: Medico) {
    this.modalImgServ.abrirModal('medicos', medico.uid!, medico.img);
  }

}
