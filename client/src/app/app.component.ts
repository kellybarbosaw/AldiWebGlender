import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'teste_Http';

  constructor(){
    console.log("rodando api da porta: " + environment.api);
  }
}
