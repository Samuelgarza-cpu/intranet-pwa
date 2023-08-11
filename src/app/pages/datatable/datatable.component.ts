
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, AfterViewInit } from "@angular/core";
import { ApiService } from '@services/api.service';
import { Subject } from 'rxjs';
import moment from 'moment';
moment.locale("es");
import { Router } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';


import Swal from 'sweetalert2'
import { data } from 'jquery';


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html'
})
export class DatatableComponent implements AfterViewInit, OnInit {

  dtOptions: DataTables.Settings = {};
  dataReq: any;
  dataDep: any;
  isMerca: any;
  usuario: any;
  dataSend: {};
  dtTrigger: Subject<any> = new Subject<any>();
  idUsers: any;


  @BlockUI() blockUI: NgBlockUI;

  constructor(private httpClient: HttpClient, private renderer: Renderer2, private service: ApiService, public _router: Router) {

  }
  ngOnInit(): void {
this.idUsers = localStorage.getItem('idUsuario');


    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.httpClient
          .get(
            `http://127.0.0.1:8000/api/requis/${this.idUsers} `
          ).subscribe(resp => {
            callback({
              recordsTotal: resp,
              recordsFiltered: resp,
              data: resp            // <-- see here
            })
           
            ;
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
                   
            return full.notificacion == 1
              ? `  <b class="bg-secondary p-2 rounded "> NOTIFICADO </b>`
              : `<div class = "btn-group text-sm">
                  <button type="button" class="btn btn-outline-primary btn-sm botoncito" data-id = ${full.IDRequisicion} data-dep = ${full.IDDepartamento} title = "Notificar Llegada" > <i class="fa-solid fa-bell fa-shake fa-xl iconoNotificar" data-id = ${full.IDRequisicion} data-dep = ${full.IDDepartamento}></i> </button>
                  <button type="button" class="btn btn-outline-secondary btn-sm mercancia" data-id = ${full.IDRequisicion} data-dep = ${full.IDDepartamento} title = "Mercancia Incorrecta" > <i class="fa-solid fa-box-check fa-xl iconoError" data-id = ${full.IDRequisicion} data-dep = ${full.IDDepartamento}></i> </button></div>`

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


      if (event.target.classList.contains('botoncito') || event.target.classList.contains('iconoNotificar')) {

        this.notificar("ENVIANDO NOTIFICACION......")
        this.dataReq = event.target.dataset.id
        this.dataDep = event.target.dataset.dep
        console.log(this.dataDep);
        
        this.usuario = localStorage.getItem('token');
        const hoy = Date.now();                // obtenemos la fecha actual
        const fechaEnviar = moment(hoy).format("YYYY-MM-DDThh:mm:ss"); // 2021-02-16 05:46 PM


        this.dataSend = {
          'idRequi': this.dataReq,
          'usuario': this.usuario,
          'fechaRegistro': fechaEnviar,
          'idDep': this.dataDep,
          
        }

        this.service.sendData(this.dataSend).subscribe((data) => {

          if (data == 1) {
            this.blockUI.stop(); // Stop blocking

            Swal.fire({
              title: `La requisición con folio ${this.dataReq} ha sido recibida`,
              html: ``,
              icon: 'success'
            }).then((result) => {
              if (result.isConfirmed) {

                window.location.reload()
              }


            });
          }
        })
      } else if (event.target.classList.contains('mercancia') || event.target.classList.contains('iconoError')) {
        Swal.fire('Surtido Incorrecto')
      }
    });

  }

  notificar(mensaje: any) {
    this.blockUI.start(mensaje); // Start blocking
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}




