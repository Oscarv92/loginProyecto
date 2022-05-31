import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.url

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public user: any;
  public token: any;
  public indentify: any;
  public nombre: any;
  public id: any;

  constructor(private http:HttpClient) { }

  crear(data:any){
    return this.http.post<any>(base_url+'cliente/crearCliente',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  login(user:any,obtenerToken=null):Observable<any>{
    let json = user;
    if(obtenerToken!=null){
      user.token = true
    }

    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.post(base_url+'cliente/login',json,{headers:headers})
  }

  obtenerToken():Observable<any>{
    let tokenAux = localStorage.getItem('token')
    if(tokenAux){
      this.token = tokenAux
    }

    else{
      this.token=null
    }

    return this.token
  }

  obtenerIdentidad():Observable<any>{
    let indentifyAux = localStorage.getItem('id')
    if(indentifyAux){
      this.indentify = indentifyAux
    }

    else{
      this.indentify=null
    }

    return this.indentify
  }

  obtenerNombre():Observable<any>{
    let nombreAux = localStorage.getItem('nombre')
    if(nombreAux){
      this.nombre = nombreAux
    }
    
    else{
      this.nombre=null
    }

    return this.nombre
  }
}
