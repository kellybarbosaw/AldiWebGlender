import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { ClientsComponent } from './components/clients/clients.component';
import { ClientComponent } from './components/client/client.component';
import { SiteComponent } from './components/site/site.component';
import { UserComponent } from './components/user/user.component';

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
        children: [
            {
                path: 'clients',
                component: ClientsComponent
            },
            {
                path: 'client',
                component: ClientComponent
            },
            {
                path: 'client/:id',
                component: ClientComponent
            },
        ]
        
    },

    {
        path: '**',
        redirectTo: 'home'
    },
];
