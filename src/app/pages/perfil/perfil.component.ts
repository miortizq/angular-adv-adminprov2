import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTmp: any = null;

  constructor(  private fb: FormBuilder,
                private userServ: UsuarioService,
                private fileupServ: FileUploadService) { 
  
    this.usuario = this.userServ.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre,Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil(){
    this.userServ.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp => {
          const {nombre, email} = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado','Perfil modificado correctamente','success');
      }, (err) => {
        Swal.fire('Error Guardando',err.error.msg,'error');
      })
  }

  cambiarImagen(event: any) {
    
    const imagSubir: File = event.target.files[0];

    if (!event.target.files[0])
    {
      return this.imgTmp=null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTmp = reader.result;
    }

    this.imagenSubir = imagSubir;

    return true;
  }

  subirImagen()
  {
    this.fileupServ.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado','Imagen actualizada correctamente','success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error Guardando','Error cargando imagen','error');
      })
  }

}
