import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    rol = 0
    public menu = [];
    idUser= {"id":localStorage.getItem('idUsuario')}
    constructor(
        public appService: ApiService,
        private store: Store<AppState>
    ) {
        this.appService.getUsuarioByID(this.idUser).subscribe(resp=>{

            this.rol=resp[0].idroles
    
            if (this.rol == 1) {
                this.menu = [
                    {
                        name: 'NOTICIAS',
                        iconClasses: 'fas fa-tachometer-alt',
                        path: ['/']
                    },
                    {
                        name: 'AVISAR',
                        iconClasses: 'fas fa-comment',
                        path: ['/aviso']
                    },
                    {
                        name: 'USUARIOS',
                        iconClasses: 'fas fa-user',
                        path: ['/usuario']
                    },
                    // {
                    //     name: 'Registro',
                    //     iconClasses: 'fas fa-folder',        
                    //     children: [
                    //         {
                    //             name: 'Cliente',
                    //             iconClasses: 'fa fa-user-plus',
                    //             path: ['/registrarcliente']
                    //         },
                    //         {
                    //             name: 'Promo',
                    //             iconClasses: 'fa fa-car',
                    //             path: ['/registrarpromocion']
                    //         }
                    //     ]
                    // },
                ];
            } else if (this.rol == 2) {
                this.menu = [
                    {
                        name: 'NOTICIAS',
                        iconClasses: 'fas fa-tachometer-alt',
                        path: ['/']
                    },
                    {
                        name: 'AVISAR',
                        iconClasses: 'fas fa-comment',
                        path: ['/aviso']
                    },
                ]
            } else if (this.rol == 3) {
                this.menu = [
                    {
                        name: 'NOTICIAS',
                        iconClasses: 'fas fa-tachometer-alt',
                        path: ['/']
                    },
                ]
            }
            MENU=this.menu;

        });
     }
    ngOnInit() {
      
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });


        /* 
        1. Realizar consulta a la BD 
        2. this.menu = resultadoConsulta()
        3. igualar valor a MENU --> MENU=this.menu
        */
  
    }
}

export let MENU = []