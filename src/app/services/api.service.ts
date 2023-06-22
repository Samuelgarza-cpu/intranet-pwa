import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // URL = "https://api-intranet-production.up.railway.app/"
    // URL="http://localhost:5050/"
    URL = "https://api.intranetgp.com/"
    urlPHP = "https://api.gomezpalacio.gob.mx/api/requis";

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
        return this.http.get(this.urlPHP);
    }

    sendData(data: any): Observable<any> {
        return this.http.post(this.urlPHP, data);
    }

    pdf(oficioIn:any): Observable<any>{
        return this.http.post(`${this.URL}api/oficio`, oficioIn);
    }
}
