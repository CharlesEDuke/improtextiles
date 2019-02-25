import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { UserComponent } from './components/user/user.component';
import { ClientsComponent } from './components/clients/clients.component';
import { RrhhComponent } from './components/rrhh/rrhh.component';
import { LoginComponent} from './components/login/login.component';
const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "providers", component: ProvidersComponent},
  {path: "user", component: UserComponent},
  {path: "clients", component: ClientsComponent},
  {path: "rrhh", component: RrhhComponent},
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
