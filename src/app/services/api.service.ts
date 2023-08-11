import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // URL = "https://api-intranet-production.up.railway.app/"
    // URL="http://localhost:5050/"
    URL = "https://api.intranetgp.com/"
    urlPHP = "https://api.gomezpalacio.gob.mx/api/requis";
    urlPHPOficios = "https://api.gomezpalacio.gob.mx/api/pdf";
    Prueba = "https://api-cove.intranetgp.com/api/pdf";
    urlLocal = "http://localhost:8000/api/requis";

    headers = new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'
      });
    constructor(private http: HttpClient) { }

    getAvisos() {
        return this.http.get(`${this.URL}api/getavisos`);
    }
    getUsuario(usuario: any): Observable<any> {
        return this.http.post(`${this.URL}api/getUsuario`, usuario);
    }
    getUsuarioByID(id: any): Observable<any> {
        return this.http.post(`${this.URL}api/getUsuariobyid`, id);
    }
    saveAviso(aviso: any): Observable<any> {

        return this.http.post(`${this.URL}api/aviso`, aviso);
    }
    saveImagen(id: any, imagen: FormData): Observable<any> {

        return this.http.post(`${this.URL}api/saveImagen/` + id, imagen);
    }
    saveToken(token: any): Observable<any> {
        return this.http.post(`${this.URL}api/save`, token);
    }
    saveUsuario(usaurio: any): Observable<any> {
        return this.http.post(`${this.URL}api/usuario`, usaurio);
    }

    getIndex(): Observable<any> {
        return this.http.get(this.urlLocal);
    }

    sendData(data: any): Observable<any> {
        return this.http.post(this.urlLocal, data);
    }

    pdf(oficioIn:any): Observable<any>{
        return this.http.post(`${this.urlPHPOficios}`, oficioIn,{headers:this.headers});
    }
}
