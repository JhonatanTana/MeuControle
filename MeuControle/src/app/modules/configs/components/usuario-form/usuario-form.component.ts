import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CadastroProdutoPedidoRequest } from "../../../../models/interface/pedido/cadastro-produto-pedido-request";
import { Subject, takeUntil } from "rxjs";
import { RegistroUsuarioRequest } from "../../../../models/interface/usuario/registro-usuario-request";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    public dialogRef: DynamicDialogRef,
    private route: Router,
  ) { }

  usuarioForm = this.formBuilder.group({
    usuario: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
  })

  registrarUsuario() {
    const requestUsuario: RegistroUsuarioRequest = {
      username: this.usuarioForm.value.usuario as string,
      email: this.usuarioForm.value.email as string,
      password: this.usuarioForm.value.senha as string,
    }
    this.usuarioService.registroUsuario(requestUsuario).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if(response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuario registrado com sucesso',
            life: 2000
          })
          this.dialogRef.close();
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/configs/usuarios']); // Navega para a mesma rota (/cardapio)
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao adicionar produto',
          life: 2000
        });
        console.error('Erro ao adicionar produto:', err);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
