import { UsuarioService } from './services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {

  }
}
