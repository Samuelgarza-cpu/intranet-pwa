import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: ApiService,
        private router: Router
    ) { }

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            const almacen = [35,38,37,36];
            await this.appService.getUsuario(this.loginForm.value).subscribe((data) => {

                if (data.length >= 1) {
                    const correo = data[0].Correo
                    const nomina = data[0].Nomina
                    const idUser = data[0].idusuarios
                    localStorage.setItem('idUsuario', idUser);
                    localStorage.setItem('Nomina', nomina);
                    localStorage.setItem('token', correo);
                    
                    if(almacen.includes(idUser))  this.router.navigate(['/requisiciones']);
                    else this.router.navigate(['/']);
                    
                    this.toastr.success('Bienvenido');
                    Swal.fire({
                        title: 'BIENVENIDO',
                        html: ` 
                        
                        <h3>Esta Intranet está diseñada para que tu y todos los trabajadores del
                         <br>
                         municipio estemos al tanto de las diferentes actividades
                        <br>
                        que se realizan en el Municipio, así mismo para que sirva como un canal de 
                        <br>
                        comunicación que te mantenga al día con información de 
                        <br>
                        tu interés y herramientas que te ayuden a realizar de manera mas eficiente tu trabajo.</h3>
                        <br>
                        `,
                        imageUrl: 'https://www.ayuntamientogp.imagendigitalstudio.com/img/logo.png',
                        imageWidth: 400,
                        imageHeight: 100,
                        imageAlt: 'Custom image',
                        confirmButtonText: "Aceptar",
                        customClass: 'swal-wide',
                    })


                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El usuario no Existe',

                    })
                }

            });
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Favor de ingresar los datos');
        }
    }



    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
