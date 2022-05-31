import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../models/clientes.models';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formValue!: FormGroup;
  clienteModel: Cliente = new Cliente();

  public mensaje_ok: any;
  public mensaje_error: any;
  public ciudad_interes = ["Bogota", "Medellin"]

  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private router: Router
  ) 
  { }

  ngOnInit(): void {
    this.obtenerCampos();
  }

  obtenerCampos(){
    this.formValue = this.formBuilder.group({
      nombre:[''],
      apellido:[''],
      correo:[''],
      contrasena:[''],
      ciudad_interes:['']
    })
  }

  CrearCliente(){
    this.clienteModel.nombre = this.formValue.value.nombre;
    this.clienteModel.apellido = this.formValue.value.apellido;
    this.clienteModel.correo = this.formValue.value.correo;
    this.clienteModel.contrasena = this.formValue.value.contrasena;
    this.clienteModel.ciudad_interes = this.formValue.value.ciudad_interes;

    if(this.clienteModel.nombre == ""){
      this.mensaje_error = "El campo Nombre no puede estar vacio"
    }

    else if(this.clienteModel.apellido == ""){
      this.mensaje_error = "El campo Apellido no puede estar vacio"
    }

    else if(this.clienteModel.correo == ""){
      this.mensaje_error = "El campo Correo no puede estar vacio"
    }

    else if(this.clienteModel.contrasena == ""){
      this.mensaje_error = "El campo Contrasena no puede estar vacio"
    }

    else if(this.clienteModel.ciudad_interes == ""){
      this.mensaje_error = "El campo Ciudad de preferencia no puede estar vacio"
    }

    else{
      this.clientesService.crear(this.clienteModel)
      .subscribe(res => {
        console.log(res);
          if(res.mensaje == "El registro ya existe"){
            this.mensaje_error = res.mensaje;
          }

          else{
            this.mensaje_ok = "Registro exitoso"
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Registro creado',
              showConfirmButton: false,
              timer: 2000
            })  
            setTimeout(() => {            
              this.router.navigate(['']);
            }, 2000);     
          }
      },
      err => {
        console.log(err)
      })
    }

  }

}
