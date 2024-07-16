import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RedefinirSenhaRequest } from "../../../../models/interface/usuario/redefinir-senha-request";
import { EventAction } from "../../../../models/interface/event/event-action";
import { UsuarioEvent } from "../../../../models/enums/usuario-event";
import { UsuarioResponse } from "../../../../models/interface/usuario/usuario-response";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { CategoriaService } from "../../../../services/categoria/categoria.service";
import { UsuarioService } from "../../../../services/usuario/usuario.service";

@Component({
  selector: 'app-reset-senha-form',
  templateUrl: './reset-senha-form.component.html',
  styleUrl: './reset-senha-form.component.scss'
})
export class ResetSenhaFormComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject()
  public usuarioSelecionadoData!: RedefinirSenhaRequest
  public usuarioAction!: {
    event: EventAction,
    usuarioData: Array<UsuarioResponse>
  }

  editUsuario = UsuarioEvent.REDEFINIR_SENHA

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogConfig,
    private messageService: MessageService,
    private route: Router,
    public dialogRef: DynamicDialogRef,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.usuarioAction = this.ref.data

    if (this.usuarioAction?.event?.action === this.editUsuario && this.usuarioAction?.usuarioData) {
      this.getUsuarioSelecionado(this.usuarioAction.event.id as number)
    }
  }

  usuarioForm = this.formBuilder.group({
    senhaAtual: ['', Validators.required],
    novaSenha: ['', Validators.required],
  })

  getUsuarioSelecionado(id: number): void {
    const usuarios = this.usuarioAction?.usuarioData

    if (usuarios?.length > 0) {
      const filtro = usuarios.filter((element) => element.id == id)

      if (filtro) {
        this.usuarioForm.setValue({
          senhaAtual: this.usuarioSelecionadoData?.senhaAtual as string,
          novaSenha: this.usuarioSelecionadoData?.novaSenha as string,
        })
      }
    }
  } //passa as informações de um usuario
  redefinirSenha() {
    const requestUsuario: RedefinirSenhaRequest = {
      Id: this.usuarioAction?.event?.id as number,
      senhaAtual: this.usuarioForm.value.senhaAtual as string,
      novaSenha: this.usuarioForm.value.novaSenha as string,
    }
    this.usuarioService.redefinirSenha(requestUsuario).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if(response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Senha alterada com sucesso',
            life: 2000
          })
          this.dialogRef.close();
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao redefinir senha',
          life: 2000
        });
      }
    })
  } // altera a senha

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
