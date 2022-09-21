import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  styles: []
})
export class RegisterComponent {

  public formsubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Mario Ortiz', [Validators.required, Validators.minLength(3)]],
    email: ['test100@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required]
  },  {
    validators: this.passwordsIguales('password', 'password2')
  })

  constructor( private fb: FormBuilder,
                private usuarioServ: UsuarioService,
                private router: Router) { }

  crearUsuario() {
    
    this.formsubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    //REalizando el Posteo
    this.usuarioServ.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        
        //Navegar al dashboard
        this.router.navigateByUrl('/');

      },(err) => {
        //Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
      );
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formsubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formsubmitted;
  }

  constrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( (pass1!=pass2) && this.formsubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  passwordsIguales(pass1: string, pass2: string){

    return (formGroup : FormGroup) => {
      
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control?.value===pass2Control?.value) {
        pass2Control?.setErrors(null);
      }
      else {
        pass2Control?.setErrors({noEsIgual: true});
      }

    }

  } 

}
