import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;

  constructor( private fb: FormBuilder,
               private hospitalServ: HospitalService,
               private medicoServ: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      
    this.activatedRoute.params
      .subscribe(({id}) => this.cargarMedicoById(id));

    this.medicoForm = this.fb.group({
        nombre: ['',Validators.required],
        hospital: ['',Validators.required]
      });

      this.cargarHospitales();  

      this.medicoForm.get('hospital')?.valueChanges
          .subscribe(resp => {           
            this.hospitalSeleccionado = this.hospitales.find(h => h.uid === resp)!;
          });
  }

  cargarHospitales() {
    this.hospitalServ.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
      })
  }

  cargarMedicoById(id: string) {

    if (id==='nuevo'){
      return;
    }

    this.medicoServ.cargarMedicoById(id)
        .pipe (
          delay(100)
        )
        .subscribe(medico => {
          if (!medico) {
            return this.router.navigateByUrl(`/dashboard/medicos`);
          }

          const {nombre, hospital:{_id}} = medico; 
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({nombre,hospital: _id});
          return true;
        });

  }

  guardarMedico() {
    
    const {nombre} = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      /* Modificar */
      const data = { ...this.medicoForm.value,
                    uid: this.medicoSeleccionado.uid};

      this.medicoServ.editarMedico(data)
          .subscribe((resp: any) => {
            Swal.fire('Medico modificado', `${nombre} modificado correctamente.`, 'success');
            //this.router.navigateByUrl(`/dashboard/medicos/${resp.medico.uid}`)
          })
    }
    else {
      /* Crear */
      
      this.medicoServ.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Medico Creado', `${nombre} creado correctamente.`, 'success');
          this.router.navigateByUrl(`/dashboard/medicos/${resp.medico.uid}`)
        });
    }
  }

}
