import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTmp: any = null;

  constructor( public modalImgServ: ModalImagenService,
               public fileupServ: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTmp = null;
    this.modalImgServ.cerrarModal();
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
    
    const id = this.modalImgServ.id;
    const tipo = this.modalImgServ.tipo;

    this.fileupServ.actualizarFoto(this.imagenSubir,tipo,id)
      .then(img => {
        Swal.fire('Guardado','Imagen actualizada correctamente','success');
        this.modalImgServ.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error Guardando','Error cargando imagen','error');
      })
  }

}
