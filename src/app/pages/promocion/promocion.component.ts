import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromocionesService } from '@services/promociones.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.component.html'
})
export class PromocionComponent implements OnInit {

  Formulario:FormGroup;
  dia = new Date().getDate();
  mes = new Date().getMonth() + 1;
  año = new Date().getFullYear();
  fecha = this.año + "-" + this.mes +"-"+ this.dia;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  id:any;


  constructor(private service:PromocionesService, private fb:FormBuilder, private router:Router){
    this.Formulario = fb.group({
      idCliente:['',Validators.required],
      fecha:['']
    });
  }

  ngOnInit(): void {
    this.Formulario.reset();
    this.enviarFecha();
  }

  existeUsuario(){
   this.id = this.Formulario.value['idCliente'];
    this.service.consultarPromo(this.id).subscribe(respuesta=>{

      if(respuesta.length > 0){

        this.service.consultarLavadas(this.id).subscribe(resultado=>{

     
      
          if(resultado.length === 4){
  
            this.service.insertarPromoActiva(this.Formulario.value).subscribe(()=>{
            });
   
            Swal.fire(
              'YA TIENE UNA PROMO ACTIVA',
              '',
              'success'
            )
              this.ngOnInit();
          }else{
             this.enviarDatos();
            Swal.fire(
              'PROMO REGISTRADA',
              '',
              'success'
            )
          }
        })



      }else{
        Swal.fire(
          'NO EXISTE USUARIO',
          '',
          'warning'
        )

        this.ngOnInit();
      }
    
    })
  }

  enviarDatos(){
    this.service.insertarPromo(this.Formulario.value).subscribe(respues=>{
       this.ngOnInit();
    })
  }
  cancelar(){

  }

  enviarFecha(){
    this.Formulario.patchValue({fecha:this.fecha})
  }


}
