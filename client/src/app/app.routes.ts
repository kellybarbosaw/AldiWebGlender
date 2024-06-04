import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { ClientsComponent } from './components/_Clientes/clients/clients.component';
import { ClientComponent } from './components/_Clientes/client/client.component';
import { SiteComponent } from './components/site/site.component';
import { UserComponent } from './components/user/user.component';
import { VendaComponent } from './components/_Contratos/venda/venda.component';
import { Client360Component } from './components/_Clientes/client360/client360.component';
import { ContratoComponent } from "./components/_Contratos/contrato/contrato.component";
import { ProjetoComponent } from "./components/_Projetos/projeto/projeto.component";
import { ProjectsComponent } from './components/_Projetos/projects/projects.component';
import { UsuarioComponent } from './components/_Usuarios/usuario/usuario.component';
import { UsuariosComponent } from './components/_Usuarios/usuarios/usuarios.component';
import { RecursoComponent } from './components/recurso/recurso.component';
import { HomeComponent } from './components/home/home.component';
import { TarefaComponent } from './components/_Tarefas/tarefa/tarefa.component';
import { TarefaStatusComponent } from './components/tarefa-status/tarefa-status.component';
import { ApontamentoComponent } from './components/apontamento/apontamento.component';
import { PessoaComponent } from './components/_Pessoas/pessoa/pessoa.component';
import { ProjetoTarefaComponent } from './components/projeto-tarefa/projeto-tarefa.component';
import { authorizedGuard } from './guard/authorized.guard';
import { PessoasComponent } from './components/_Pessoas/pessoas/pessoas.component';
import { ContratosComponent } from './components/_Contratos/contratos/contratos.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { ProjetoStatusComponent } from './components/projetoStatus/projetoStatus.component';
import { TarefasComponent } from './components/_Tarefas/tarefas/tarefas.component';
import { ProjetosComponent } from './components/_Projetos/projetos/projetos.component';


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
                path: '',
                component: HomeComponent
            },
            {
                path: 'kanban',
                component: KanbanComponent,
            },
            {
                path: 'kanban/:id',
                component: KanbanComponent,
            },
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
                path: 'contratos',
                component: ContratosComponent
            },
            {
                path: 'contrato/:id',
                component: ContratoComponent
            },
            {
                path: 'c/projeto/:id',
                component: ProjetoComponent
            },
            {
                path: 'projeto/:event/:id',
                component: ProjectsComponent
            },
            {
                path: 'projetos',
                component: ProjetosComponent
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
                path: 'pessoas',
                component: PessoasComponent
            },
            {
                path: 'pessoa',
                component: PessoaComponent
            },
            {
                path: 'pessoa/:id',
                component: PessoaComponent
            },
            {
                path: 'recurso',
                component: RecursoComponent
            },
            {
                path: 'recurso/:id',
                component: RecursoComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'tarefas',
                component: TarefasComponent
            },
            {
                path: 'tarefa',
                component: TarefaComponent
            },
            {
                path: 'tarefa/:id',
                component: TarefaComponent
            },
            {
                path: 'tarefaStatus',
                component: TarefaStatusComponent
            },
            {
                path: 'tarefaStatus/:id',
                component: TarefaStatusComponent
            },
            {
                path: 'apontamento',
                component: ApontamentoComponent
            },
            {
                path: 'apontamento/:id',
                component: ApontamentoComponent
            },          
            {
                path: 'projetoTarefa',
                component: ProjetoTarefaComponent
            },
            {
                path: 'projetoTarefa/:id',
                component: ProjetoTarefaComponent
            },
            {
                path: 'projetoStatus',
                component: ProjetoStatusComponent
            },
            // {
            //     path: 'projetoStatus/:id',
            //     component: ProjetoStatusComponent
            // },
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