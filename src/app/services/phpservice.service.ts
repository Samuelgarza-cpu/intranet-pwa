import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhpserviceService {
    API:string = "https://gruposavir.com.mx/Desarrollo/index.php/";
    APIPROMO:string = "https://gruposavir.com.mx/Desarrollo/lavados.php";
  constructor(private http:HttpClient) { 

  }
  getUser(){
    return this.http.get(this.API);
  }
  insertUser(datosEmpleado:any):Observable<any>{
    return this.http.post(this.API+"?insertar=1",datosEmpleado)
  }

  borrarUser(id:any):Observable<any>{
    return this.http.get(this.API+"?borrar=" + id)
  }

  consultarUser(id:any){
    return this.http.get(this.API+"?consultar=" + id)
  }

   actualizarUser(datosEmpleado:any,id:any):Observable<any>{
    return this.http.post(this.API+"?actualizar="+id,datosEmpleado)
  }

}
