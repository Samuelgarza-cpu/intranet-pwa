import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from '@services/api.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss']
})
export class NoticiaComponent implements OnInit {
  Formulario: FormGroup;
  selectedFile: File = null;
  binary = new FormData();
  imagenURL = "";

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.Formulario = fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      archivo: ['', Validators.required],
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
    this.apiService.saveAviso(this.Formulario.value).subscribe((data) => {

      const UltimoID = data.idIsert

      if (data.code == 1) {

        this.apiService.saveImagen(UltimoID, this.binary).subscribe((data) => {
          if (data == 1) {

            Swal.fire(
              'ENVIADO',
              '',
              'success'
            ).then(() =>{

              location.reload();
              this.ngOnInit();

            })
           
            
          } else {
            console.log(data)
          }


        })

   
      }
    })

  }

}
