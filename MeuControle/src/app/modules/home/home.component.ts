import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { LoginUsuarioRequest } from "../../models/interface/usuario/login-usuario-request";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  loading: boolean = false;

  loginForm = this.formBuilder.group({
    UserName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  load() {
    this.loading = true;
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) { //verifica se o formulário e valida e possui valor
      this.usuarioService.login(this.loginForm.value as LoginUsuarioRequest).subscribe(
        { next: (response) => {
            this.cookieService.set("UserInfo", response?.token);
            this.cookieService.set("UserExpiration", response.expiration!);
            this.loginForm.reset();
            this.router.navigate(['/dashboard'])

            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem-Vindo ${response?.nome}`,
              life: 2000,
            })
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: `Erro ao fazer login`,
              life: 2000,
            })
            this.loading = false
          }
        }
      )
    }
  }
}
