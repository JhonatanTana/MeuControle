import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoPedidoResponse } from "../../../../models/interface/pedido/produto-pedido-response";
import { Subject, takeUntil } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProdutoPedidoService } from "../../../../services/pedido/produto/produto-pedido.service";
import { PedidoEvent } from "../../../../models/enums/pedido-event";

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.scss'
})
export class ProdutoListComponent implements OnInit, OnDestroy {
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
    private confirmationService: ConfirmationService,
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
            console.log('Resposta:',response)
          }
        }
      })
    }
  }
  handleDeleteProdutoPedido(id: number) {
    this.confirmationService.confirm({
      message: `Confirma a exclusao do produto ?`,
      header: "Confirmação de Exclusão",

      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () =>
        this.produtoPedidoService.deleteProdutoPedido(id).pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto removido com sucesso',
                life: 2000
              })
              this.dialogRef.close()
            }
          }
        })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
