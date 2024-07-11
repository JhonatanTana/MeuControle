import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from "./services/usuario/usuario.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'MeuControle';

  constructor(private userService: UsuarioService, private route: Router) {}

  ngOnInit(): void {
    if (this.userService.TokenExpirado()) {
      this.userService.deleteToken(); // Exclui o token expirado
      this.route.navigate(["/"])
    }
  }
}
