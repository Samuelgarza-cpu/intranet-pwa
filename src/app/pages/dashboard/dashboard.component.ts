import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import { SwPush } from '@angular/service-worker';
import { ApiService } from '@services/api.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   avisos:any;
  _token: any;
  imagenURL = "http://localhost:5050/public/codigo-qr.png"
  readonly VAPID_PUBLIC_KEY = "BFBvncHQOrM2_1F-Pb567krxlF9V8aZSMRRxX3UvMPxmfzJHTEWiY3LASbrAi5wJWnGrGYn-5poFaP_uTEbKYnA";
    constructor(private swPush: SwPush, private apiService:ApiService){}

    ngOnInit(): void {
      this.subscribeToNotifications();
      this.apiService.getAvisos().subscribe((data)=>{
        this.avisos = data;
   
        
      })
  
    }

    subscribeToNotifications() {

      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          const token = JSON.parse(JSON.stringify(sub));
          console.log('*************OJO*********', token);
          this._token = token
          this._token.idUser=localStorage.getItem('idUsuario')
          this.apiService.saveToken(this._token).subscribe((respuesta)=>{
            console.log(respuesta);
          })
        })
        .catch(err => console.error("Could not subscribe to notifications", err));
    }
    comentarios(){
        
        Swal.fire({
            title: 'Escribe tu comentario',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: (comentario) => {
              return fetch(`//api.github.com/users/${comentario}`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Comentario requerido`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
              })
            }
          })

    }
    alertaWIFI(){
        Swal.fire({
            title: 'NIBBLE',
            html: ` <h1>Mensaje</h1>
                    <p>Pagina principal <strong>gomezpalacio.gob.mx</strong></p>
                    <br>
                    `,
            imageUrl: 'https://lh3.googleusercontent.com/-zS5qHo4vKBY/V_Xf1bpM64I/AAAAAAAA6uY/yd35D0E0sAQ/s462/no-wifi.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })

    }

    modal(event:any, items:any){

      if (event.target.matches(".botoncito")) return;
      else if (event.target.matches(".botoncito *")) return;
      


    document.getElementById('modalBody').innerHTML = `
    <div>
    <div class="text-center mb-5">
    <img src="https://api.intranetgp.com/public/${items.Imagen}" alt="" class="img-fluid" style="max-height: 40vh !important; width: auto; ">
    </div>

        <h3>Descripción:</h3>
          <hr>

          <h2>${items.Descripcion}</h2>
          
   
  </div>`

      const modalclick = document.getElementById('abrirmodal')
      modalclick.click();
    }
}
