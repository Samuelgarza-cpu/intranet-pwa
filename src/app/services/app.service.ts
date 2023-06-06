import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router, private toastr: ToastrService) {}

    async loginByAuth({email, password}) {
        try {
            // const token = await Gatekeeper.loginByAuth(email, password);
            localStorage.setItem('token', email);
            await this.getProfile();
            this.router.navigate(['/']);
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

        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
            this.user = localStorage.getItem('token');
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('Nomina');
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
