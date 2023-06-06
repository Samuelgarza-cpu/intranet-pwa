import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html'
})
export class DatatableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .get(
            'https://jsonplaceholder.typicode.com/posts'
          ).subscribe(resp => {
            callback({
              recordsTotal: resp,
              recordsFiltered: resp,
              data: resp            // <-- see here
            });
          });
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Titulo',
        data: 'title'
      }, {
        title: 'Detalle',
        data: 'body'
      }],
      columnDefs: [
        {
          className: "dt-center",
          targets: "_all",
        },
      ],
      pagingType: 'full_numbers',

      dom: '<"row mb-2"B><"row"<"col-md-6 "lr> <"col-md-6"f> > rt <"row"<"col-md-6 "i> <"col-md-6"p> >',
      lengthMenu: [
        [5, 10, 50, 100, -1],
        [5, 10, 50, 100, "Todos"],
      ],
      pageLength: 10,
      processing: true,
      responsive: true,
      deferRender: true,
      // aaSorting: [], //deshabilitar ordenado automatico
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      }

    };
  }
}

