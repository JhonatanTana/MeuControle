import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoListComponent } from "../../../pedidos/components/produto-list/produto-list.component";
import { Subject, takeUntil } from "rxjs";
import { UsuarioResponse } from "../../../../models/interface/usuario/usuario-response";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { UsuarioFormComponent } from "../../components/usuario-form/usuario-form.component";
import { ResetSenhaFormComponent } from "../../components/reset-senha-form/reset-senha-form.component";

@Component({
  selector: 'app-usuario-page',
  templateUrl: './usuario-page.component.html',
  styleUrl: './usuario-page.component.scss'
})
export class UsuarioPageComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject()
  @Output() usuarioEvent = new EventEmitter<EventAction>();
  public usuarioList: Array<UsuarioResponse> = [];
  private ref!: DynamicDialogRef

  constructor(
    private route: Router,
    private messageService: MessageService,
    private dialogService: DialogService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    //this.getUsuarios()
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response) {
          this.usuarioList = response;
        }
      }
    })
  }
  handleUsuarioAction(event: EventAction): void {
    if (event?.action == 'Adicionar Usuario') {
      this.ref = this.dialogService.open(UsuarioFormComponent, {
        header: event?.action,
        width: '40rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: {
          event: event,
          usuarioData: this.usuarioList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getUsuarios(),
      });
    }
    else if (event?.action == 'Redefinir Senha') {
      this.ref = this.dialogService.open(ResetSenhaFormComponent, {
        header: event?.action,
        width: '40rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: {
          event: event,
          usuarioData: this.usuarioList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getUsuarios(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
