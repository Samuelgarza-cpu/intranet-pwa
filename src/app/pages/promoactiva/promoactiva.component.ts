import { Component, OnInit } from '@angular/core';
import{PromocionesService} from '@services/promociones.service'

@Component({
  selector: 'app-promoactiva',
  templateUrl: './promoactiva.component.html'

})
export class PromoactivaComponent implements OnInit {
  data:any;
  constructor(private service:PromocionesService){

  }

  ngOnInit(): void {
    this.service.consultarPromoActiva().subscribe(resultado=>{
      console.log(resultado);
      this.data = resultado;
    })
    
  }



}
