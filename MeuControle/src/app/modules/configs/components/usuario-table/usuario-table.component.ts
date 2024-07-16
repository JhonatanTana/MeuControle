import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { UsuarioResponse } from "../../../../models/interface/usuario/usuario-response";
import { EventAction } from "../../../../models/interface/event/event-action";
import { UsuarioEvent } from "../../../../models/enums/usuario-event";
import { Table } from "primeng/table";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { InativaUsuario } from "../../../../models/interface/usuario/inativa-usuario";

@Component({
  selector: 'app-usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.scss'
})
export class UsuarioTableComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  NomeSearchValue: string = '';
  EmailSearchValue: string = '';
  @Output() usuarioEvent = new EventEmitter<EventAction>();
  @Input() usuario: Array<UsuarioResponse> = []


  public addUsuario = UsuarioEvent.ADD_USUARIO
  public resetaSenha = UsuarioEvent.REDEFINIR_SENHA
  public inativaUsuario = UsuarioEvent.DESATIVAR_USUARIO

  constructor(
    private usuarioService: UsuarioService,
    private route: Router,
    private messageService: MessageService,
  ) {  }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response) {
          this.usuario = response;
        }
      }
    })
  }
  voltar() {
    this.route.navigate(['/configs']); // Substitua '/home' pela rota desejada
  }
  clear(table: Table) {
    table.clear();
    this.NomeSearchValue = ''
    this.EmailSearchValue = ''
  }
  applyFilters(table: any) {
    table.filter(this.NomeSearchValue, 'userName', 'contains');
    table.filter(this.EmailSearchValue, 'email', 'contains');
  }
  handleUsuarioEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const produtoEventData = id && id !== 0 ? {action, id} : {action}
      this.usuarioEvent.emit(produtoEventData);
    }
  }
  DeletarUsuario(id: string): void {
    this.usuarioService.deletarusuario(id).pipe().subscribe({
      next: (response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuario deletado',
            life: 2000
          });
        }
        this.recarregaPagina()
      }
    })
  }
  InativaUsuario(id: string, ativo: boolean): void {
    const requestData: InativaUsuario = {
      id: id,
      ativo: ativo
    }
    this.usuarioService.inativarUsuario(requestData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuario desabilitado',
            life: 2000
          })
        }
      }
    })
    this.recarregaPagina()
  }
  recarregaPagina() {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/configs/usuarios']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
