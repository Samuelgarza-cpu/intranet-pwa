import {
    Component,
    OnInit,
    HostBinding
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @HostBinding('class') class = 'register-box';

    public registerForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private toastr: ToastrService,
        private appService: ApiService
    ) { }

    ngOnInit() {

        this.registerForm = new UntypedFormGroup({
            Nombre: new UntypedFormControl(null, Validators.required),
            App: new UntypedFormControl(null, [Validators.required]),
            Apm: new UntypedFormControl(null, Validators.required),
            email: new UntypedFormControl(null, Validators.required),
            Nomina: new UntypedFormControl(null, [Validators.required]),
            password: new UntypedFormControl(null, Validators.required),
            Rol: new UntypedFormControl(3, Validators.required)
        });
    }

    async registerByAuth() {
        if (this.registerForm.valid) {
            this.isAuthLoading = true;

   
            await this.appService.saveUsuario(this.registerForm.value).subscribe((data) => {
                switch (data) {
                    case 1:
                        Swal.fire(
                            'Guardado',
                            '',
                            'success'
                        )
                        break;
                    case 2:
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se guardo, hable a sistemas'
                        })
                        break;
                        break;
                    case 3:
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario ya registrado'
                        })
                        break;

                }

                this.registerForm.reset();
            });
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Favor de completar el registro',this.registerForm.status);
        }
    }


}
