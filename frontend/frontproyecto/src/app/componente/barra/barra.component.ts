import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  public id: any;
  public token: any;
  public nombre: any;

  constructor(private clientesService:ClientesService, public router:Router) 
  { 
    this.id = this.clientesService.obtenerIdentidad();
    this.token = this.clientesService.obtenerToken();
    this.nombre = this.clientesService.obtenerNombre();
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.removeItem('token')
    localStorage.removeItem('nombre')
    localStorage.removeItem('id')

    this.id = null;
    this.nombre = null;
    this.token = null;

    this.router.navigate([''])

  }

}
