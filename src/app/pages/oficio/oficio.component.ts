import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-oficio',
  templateUrl: './oficio.component.html',
  styleUrls: ['./oficio.component.scss']
})
export class OficioComponent implements OnInit {
  Formulario: FormGroup;
  selectedFile: File = null;
  binary = new FormData();
  imagenURL = "";
  oficioFecha: any = moment().format('DD [de] MMMM [de] YYYY').toUpperCase();
  @BlockUI() blockUI: NgBlockUI;



  constructor(private fb: FormBuilder, private apiService: ApiService) {

    this.Formulario = fb.group({
      Remitente: ['', Validators.required],
      Destinatario: ['', Validators.required],
      descripcion: ['', Validators.required],
      Atentamente: ['', Validators.required],
      archivo: ['', Validators.required],
      folioInterno: ['', Validators.required],
      Correo: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'insertImage',
        'insertVideo',
        'heading',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'backgroundColor',
      ]
    ]

  };

  ngOnInit(): void {

    this.Formulario.reset();

    this.Formulario.get('fecha').patchValue(this.oficioFecha);

  }
  createFormData(event) {
    this.selectedFile = event.target.files[0];
    // const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile)
    reader.onload = (event: any) => {
      this.imagenURL = event.target.result;
    }
    this.binary.append('imagen', this.selectedFile);
  }
  enviarDatos() {
    try {
      this.notificar("ENVIANDO OFICIO......")
      this.apiService.pdf(this.Formulario.value).subscribe((data) => {
        console.log(data);
        if (data == 1) {
          this.blockUI.stop(); // Stop blocking

          Swal.fire({
            title: `EL OFICIO SE ENVIO CORRECTAMENTE`,
            html: ``,
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {

              location.reload();
              this.ngOnInit();
            }
          });
        } else {
          console.log(data);
          this.blockUI.stop(); // Stop blocking
        }
      }, error => {
        console.log(error);
        this.blockUI.stop(); // Stop blocking

        Swal.fire({
          title: `REVISAR EL CORREO`,
          html: ``,
          icon: 'error'
        })
      })
    } catch (error) {
      console.log(error);
      this.blockUI.stop(); // Stop blocking
    }

  }


  notificar(mensaje: any) {
    this.blockUI.start(mensaje); // Start blocking
  }
}

