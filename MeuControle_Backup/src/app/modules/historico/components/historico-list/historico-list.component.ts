import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoPedidoResponse } from "../../../../models/interface/pedido/produto-pedido-response";
import { ConfirmationService, MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { ProdutoPedidoService } from "../../../../services/pedido/produto/produto-pedido.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: 'app-historico-list',
  templateUrl: './historico-list.component.html',
  styleUrl: './historico-list.component.scss'
})
export class HistoricoListComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  @Output() pedidoEvent = new EventEmitter<EventAction>();
  public produtoPedidoList: Array<ProdutoPedidoResponse> = [];
  public pedidoAction!: {
    event: EventAction,
    produtosData: Array<ProdutoPedidoResponse>
  }

  constructor(
    private messageService: MessageService,
    private route: Router,
    private produtoPedidoService: ProdutoPedidoService,
    public ref: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.pedidoAction = this.ref.data
    this.getProdutosPedido(this.pedidoAction.event.id)
  }

  getProdutosPedido(id?: number) {
    if (id) {
      this.produtoPedidoService.getProdutosPedido(id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if(response) {
            this.produtoPedidoList = response
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
