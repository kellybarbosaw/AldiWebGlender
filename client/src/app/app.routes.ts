import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/client/client.component';
import { SiteComponent } from './components/site/site.component';
import { UserComponent } from './components/user/user.component';
import { VendaComponent } from './components/venda/venda.component';
import { Client360Component } from './components/client360/client360.component';
import { ContratoComponent } from "./components/contrato/contrato.component";
import { ProjetoComponent } from "./components/projeto/projeto.component";
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { authorizedGuard } from './guard/authorized.guard';

export const routes: Routes = [
    {
        path: 'home',
        component: SiteComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate:[authorizedGuard],
        children: [
            {
                path: 'clients',
                component: ClientsComponent
            },
            {
                path: 'client',
                component: ClientComponent,
            },
            {
                path: 'client360/:id',
                component: Client360Component
            },
            {
                path: 'client/:id',
                component: ClientComponent
            },
            {
                path: 'clientes/vendas/:event/:id',
                component: VendaComponent
            },
            {
                path: 'venda/:id',
                component: VendaComponent
            },
            {
                path: 'contrato/:id',
                component: ContratoComponent
            },
            {
                path: 'contract/projeto/:id',
                component: ProjetoComponent
            },
            {
                path: 'projeto/:event/:id',
                component: ProjectsComponent
            },
            {
                path:'pessoa',
                component: PessoaComponent
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
        ]
    },

    {
        path: '**',
        redirectTo: 'home'
    },
];
