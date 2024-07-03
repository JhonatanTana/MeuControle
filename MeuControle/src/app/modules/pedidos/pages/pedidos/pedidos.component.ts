import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { PedidoService } from "../../../../services/pedido/pedido.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PedidoResponse } from "../../../../models/interface/pedido/pedido-response";
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoListComponent } from "../../components/produto-list/produto-list.component";
import { ConcluiPedidoComponent } from "../../components/conclui-pedido/conclui-pedido.component";
import { ProdutoFormComponent } from "../../components/produto-form/produto-form.component";
import { NovoPedidoFormComponent } from "../../components/novo-pedido-form/novo-pedido-form.component";
import { PedidoEvent } from "../../../../models/enums/pedido-event";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit,OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  @Output() pedidoEvent = new EventEmitter<EventAction>();
  public pedidoList: Array<PedidoResponse> = [];
  private ref!: DynamicDialogRef

  ngOnInit(): void {
    this.getAPIPedidoAbertos()
  }

  constructor(
    private pedidoService: PedidoService,
    private route: Router,
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {}

  getAPIPedidoAbertos() {
    this.pedidoService.getPedidosAbertos().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.pedidoList = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Erro ao buscar os pedidos",
          life: 2000
        })
      }
    })
  }
  AdicionarPedido() {
    this.ref = this.dialogService.open(NovoPedidoFormComponent, {
      header: 'Adicionar Pedido',
      width: '25rem',
      draggable: true,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        event: event,
        pedidoData: this.pedidoList,
      },
    });
    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.getAPIPedidoAbertos(),
    });
  }
  handlePedidoAction(event: EventAction): void {
    if (event?.action == 'Detalhes do Pedido') {
      this.ref = this.dialogService.open(ProdutoListComponent, {
        header: event?.action,
        width: '40rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: {
          event: event,
          pedidoData: this.pedidoList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIPedidoAbertos(),
      });
    }
    else if (event?.action == 'Concluir Pedido'){
      this.ref = this.dialogService.open(ConcluiPedidoComponent, {
        header: event?.action,
        width: '25rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: {
          event: event,
          pedidoData: this.pedidoList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIPedidoAbertos(),
      });
    }
    else if (event?.action == 'Adicionar produto ao pedido'){
      this.ref = this.dialogService.open(ProdutoFormComponent, {
        header: event?.action,
        width: '25rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: {
          event: event,
          pedidoData: this.pedidoList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIPedidoAbertos(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
