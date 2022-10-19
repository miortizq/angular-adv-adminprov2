import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalusuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTmp: Usuario[] = [];

  public imgSubs!: Subscription;
  public pagDesde: number = 0;
  public cargando: boolean = true;
  
  constructor( private usuServ: UsuarioService,
               private busquedaServ: BusquedasService,
               private modalImgServ: ModalImagenService) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    
    this.cargarUsuarios();
    this.imgSubs = this.modalImgServ.nuevaImagen
      .pipe(delay(100))
      .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuServ.cargarUsuarios(this.pagDesde)
    .subscribe( ({total,usuarios}) => {
      this.totalusuarios = total;
      this.usuarios = usuarios;
      this.usuariosTmp = usuarios;
      this.cargando =false;
    } ) 
  }

  cambiarPagina(valor: number) {
    
    this.pagDesde += valor ;

    if (this.pagDesde<0){
      this.pagDesde = 0;
    }
    else if (this.pagDesde >= this.totalusuarios) {
      this.pagDesde -= valor ;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {

    if (termino.length === 0)
    {
      return this.usuarios = this.usuariosTmp;
    }

    return this.busquedaServ.buscar('usuarios',termino)
      .subscribe((resultados: any) => {
        this.usuarios = resultados;
      })

  }

  eliminarUsuario(usuario: Usuario) {

    //Validación para no eliminarme a mi mismo
    if ( usuario.uid === this.usuServ.uid )
    {
      Swal.fire('Error', 'No puedes eliminarte a ti mismo, que sucede ?', 'error');
    }
    else {
      Swal.fire({
        title: '¿Eliminar Usuario?',
        text: `Está a punto de eliminar al usuario ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminadle!'
      }).then((result) => {
        if (result.value) {
          this.usuServ.eliminarUsuario(usuario)
            .subscribe(resp => 
                {
                  this.cargarUsuarios();
                  Swal.fire('Eliminado!',`El usuario ${ usuario.nombre} ha sido eliminado.`,'success')
                }  
            );
        }
      })
    }
  }

  cambiarRole(usuario: Usuario){
    this.usuServ.guardarUsuario(usuario)
      .subscribe(resp => {
        console.log(usuario);
      })
  }

  abrirModal(usuario: Usuario) {
    this.modalImgServ.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
