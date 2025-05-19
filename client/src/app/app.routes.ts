import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { UserComponent } from './components/user/user.component';
import { UsuarioComponent } from './components/_Usuarios/usuario/usuario.component';
import { UsuariosComponent } from './components/_Usuarios/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import { authorizedGuard } from './guard/authorized.guard';
import { AgendaComponent } from './components/agenda/agenda.component';


export const routes: Routes = [
    {
        path: 'home',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    
    {
        path: 'agenda',
        component: AgendaComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate:[authorizedGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path:'usuarios',
                component: UsuariosComponent
            },
            {
                path:'usuario',
                component: UsuarioComponent
            },
            {
                path:'usuario/:event/:user',
                component: UsuarioComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: '**',
                component: HomeComponent
            }
        ]
    },

    {
        path: '**',
        redirectTo: 'home'
    },
];