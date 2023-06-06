import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PhpserviceService } from './../../services/phpservice.service';

import Swal from 'sweetalert2'




@Component({
  selector: 'app-regcliente',
  templateUrl: './regcliente.component.html'

})
export class RegclienteComponent implements OnInit {
  data:any = [];
  Formulario:FormGroup;
  dia = new Date().getDate();
  mes = new Date().getMonth() + 1;
  año = new Date().getFullYear();
  fecha = this.año + "-" + this.mes +"-"+ this.dia;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  btnactualizar = false;
  isCancel = true;
  idUsuario = "";

  constructor(private service:PhpserviceService, private fb:FormBuilder, private router:Router){
    this.Formulario = fb.group({
      nombre:['',Validators.required],
      app:['',Validators.required],
      apm:['',Validators.required],
      correo:['',Validators.pattern(this.emailPattern)],
      telefono:['',[Validators.required,Validators.maxLength(10),Validators.pattern(this.mobnumPattern)]],
      fecha:['']
    });
  }

  ngOnInit(): void {

    this.Formulario.reset();
    this.patchValue();
    this.service.getUser().subscribe(res=>{
    this.data = res;
    this.btnactualizar = false;
    })
  }

  patchValue():void{
    this.Formulario.patchValue({fecha:this.fecha});
  }

  enviarDatos():any{
    if(this.btnactualizar == false){
      this.service.insertUser(this.Formulario.value).subscribe(respuesta=>{
        if( respuesta.success == 1  ){
          Swal.fire(
            'GUARDADO',
            '',
            'success'
          )

          this.ngOnInit();
        }else{
      
          Swal.fire(
            'IMPORTATE',
            'TELEFONO DUPLICADO'
          )
          this.ngOnInit();
        }
          });

    }else{
  
      this.service.actualizarUser(this.Formulario.value,this.idUsuario).subscribe(respuesta=>{
          this.cancelar();
          this.ngOnInit();
    })
  }
}
    Actualizar(id):any{

    this.service.consultarUser(id).subscribe(respuesta=>{
      this.Formulario.patchValue({
        nombre:respuesta[0].NombreUser,
        app:respuesta[0].App,
        apm:respuesta[0].Apm,
        correo:respuesta[0].Correo,
        telefono:respuesta[0].Telefono,
        fecha:respuesta[0].FechaAlta
      })

      this.btnactualizar = true;
      this.isCancel = false;
      this.idUsuario = id

    });
      
    }
    cancelar():void{

      this.btnactualizar = false;
      this.isCancel = true;
      this.Formulario.reset();

    }
    Eliminar(id):any{
  
      Swal.fire({
        title: '¿ESTAS SEGURO?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Borrarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.borrarUser(id).subscribe(resultado=>{
          this.ngOnInit();
          })
          Swal.fire(
            'Borrado!',
            '',
            'success'
          )


        }
      })
    }

}
