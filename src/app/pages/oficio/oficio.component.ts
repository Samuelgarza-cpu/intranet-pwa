import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';
import { GcPdfViewer } from '@grapecity/gcpdfviewer';

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
  oficio:any;

    constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.Formulario = fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      archivo: ['', Validators.required],
      fecha: ['', Validators.required]


    });
    this.oficio = "https://api.gomezpalacio.gob.mx/api/pdf"

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
 
    }
  
  }

