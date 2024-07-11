import { Injectable } from '@angular/core';
import { UsuarioService } from "../services/usuario/usuario.service";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(
    private userService: UsuarioService,
    private router: Router,
  ) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.estaLogado()) {
      this.router.navigate(['/home'])
      return false
    }

    this.userService.estaLogado()
    return true
  }
}

