import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componente/inicio/inicio.component';
import { RegistroComponent } from './componente/registro/registro.component';
import { LoginComponent } from './componente/login/login.component';

const routes: Routes = [
  {path:"",component:InicioComponent},
  {path:"inicio",component:InicioComponent},
  {path:"registro",component:RegistroComponent},
  {path:"login",component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
