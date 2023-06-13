
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, AfterViewInit} from "@angular/core";
import { Subject } from 'rxjs';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html'
})
export class DatatableComponent implements AfterViewInit, OnInit {

  dtOptions: DataTables.Settings = {};
  dataReq: any;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient, private renderer: Renderer2) {

  }
  ngOnInit(): void {

    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.httpClient
          .get(
            'https://api.gomezpalacio.gob.mx/api/requis'
          ).subscribe(resp => {
            console.log(resp);

            callback({
              recordsTotal: resp,
              recordsFiltered: resp,
              data: resp            // <-- see here
            });
          });
      },
      columns: [
        {
          title: 'Folio',
          data: 'IDRequisicion'
        }, {
          title: 'Ejercicio',
          data: 'Ejercicio'
        }, {
          title: 'Departamento',
          data: 'Nombre_Departamento'
        }, {
          title: 'Estatus',
          data: 'Status'
        },
        {
          title: 'Solicitante',
          data: 'Solicitante'
        }, {
          title: 'Observaciones',
          data: 'Observaciones'
        }, {
          title: 'Requisitor',
          data: 'Requisitor'
        }, {
          title: 'Fecha Cotizacion',
          data: 'FechaCotizacion'
        }, {
          title: 'Acciones',
          render: function (data: any, type: any, full: any) {
            return `  <button type="button" class="btn btn-outline-primary botoncito" data-id = ${full.IDRequisicion}> Confirmar Recibido </button>`;
          }
        }
      ],
      dom: '<"row mb-2"B><"row"<"col-md-6 "lr> <"col-md-6"f> > rt <"row"<"col-md-6 "i> <"col-md-6"p> >',
      lengthMenu: [
        [5, 10, 50, 100, -1],
        [5, 10, 50, 100, "Todos"],
      ],
      pageLength: 10,
      processing: true,
      responsive: false,
      deferRender: true,
      // aaSorting: [], //deshabilitar ordenado automatico
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      },
      ordering: false
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {

      if (event.target.classList.contains('botoncito')) {

        this.dataReq = event.target.dataset.id
        Swal.fire({
          title: `La requisición con folio ${this.dataReq} ha sido recibida`,
          html: ``,
          icon: 'success'
        });
      }
    });
      
  }

  notificar(id: any) {
    console.log(id)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}




