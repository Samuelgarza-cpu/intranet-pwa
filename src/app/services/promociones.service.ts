
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  APIPROMO:string = "https://gruposavir.com.mx/Desarrollo/lavados.php/";
  constructor(private http:HttpClient) { }

  insertarPromo(datosPromo:any):Observable<any>{
    return this.http.post(this.APIPROMO +"?insertarPromo",datosPromo);
  }

  insertarPromoActiva(datosPromo:any):Observable<any>{
    return this.http.post(this.APIPROMO +"?insertarPromoActiva",datosPromo);
  }

  consultarPromo(id:any):Observable<any>{
    return this.http.get(this.APIPROMO +"?consultar=" + id );
  }

  consultarPromoActiva():Observable<any>{
    return this.http.get(this.APIPROMO + "?promoactiva");
  }


  consultarLavadas(id:any):Observable<any>{
    return this.http.get(this.APIPROMO +"?lavadas=" + id );
  }
}
