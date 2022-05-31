import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { switchAll } from 'rxjs';
import { ClientesService } from 'src/app/servicios/clientes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any;
  public token: any;
  public identify: any;
  public nombre: any;
  public mensaje_ok: any;
  public mensaje_error: any;

  formValue!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private clientesService:ClientesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.camposLogin();
  }

  camposLogin(){
    this.formValue = this.formBuilder.group({
      correo:[''],
      contrasena:['']
    })
  }

  login(){
    if(this.formValue.value.correo==""){
      this.mensaje_error="Falta diligenciar el correo"
    }
    else if(this.formValue.value.contrasena==""){
      this.mensaje_error="Falta diligenciar su contraseña"
    }
    else {
      this.clientesService.login(this.formValue.value).subscribe(
        response => {
          console.log(response)

          if(response.mensaje=="correo incorrecto"){
            this.mensaje_error="El correo no existe"
          }

          else if(response.mensaje=="Contraseña incorrecta"){
            this.mensaje_error="La contraseña es incorrecta"
          }

          else{
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Inicio de sesión correcto',
              showConfirmButton: false,
              timer: 1000
            })

            this.token = response.token
            this.nombre = response.nombre
            this.identify=response.id

            localStorage.setItem('token',this.token);
            localStorage.setItem('nombre',this.nombre);
            localStorage.setItem('id',this.identify);

            this.clientesService.login(this.formValue.value).subscribe(

              response=>{
                console.log(response)                
                this.router.navigate(['inicio'])
              },
              error=>{
                console.log(error)
                alert(error)
              }

            )
          }
        },
        error=>{
          console.log(error)
          alert(error)
        }
      )
    }
  }
}
