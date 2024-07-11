import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoPedidoResponse } from "../../../../models/interface/pedido/produto-pedido-response";
import { ConfirmationService, MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { ProdutoPedidoService } from "../../../../services/pedido/produto/produto-pedido.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProdutoResponse } from "../../../../models/interface/produto/produto-response";
import { ProdutoService } from "../../../../services/produto/produto.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ProdutoRequest } from "../../../../models/interface/produto/produto-request";
import { CadastroProdutoPedidoRequest } from "../../../../models/interface/pedido/cadastro-produto-pedido-request";

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  @Output() pedidoEvent = new EventEmitter<EventAction>();
  public produtoList: Array<ProdutoResponse> = [];
  public produtoPedidoList: Array<ProdutoPedidoResponse> = [];
  public pedidoAction!: {
    event: EventAction,
    produtosData: Array<ProdutoPedidoResponse>
  }
  produtosSelecionado:string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private produtoService: ProdutoService,
    private produtoPedidoService: ProdutoPedidoService,
    public ref: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
  ) { }

  produtoPedidoForm = this.formBuilder.group({
    quantidade: [0, Validators.required],
    produtoId: [0, Validators.required],
    pedidoId: [0]
  })

  ngOnInit(): void {
    this.pedidoAction = this.ref.data
    this.getProdutosPedido(this.pedidoAction.event.id)
  }

  getProdutosPedido(id?: number) {
    if (id) {
      this.produtoService.getProdutoAtivo().pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if(response) {
            this.produtoList = response
          }
        }
      })
    }
  }
  handleAdicionarProduto() {
    this.produtoPedidoForm.patchValue({
      pedidoId: this.pedidoAction.event.id
    });
    const requestProduto: CadastroProdutoPedidoRequest = {
      quantidade: this.produtoPedidoForm.value.quantidade as number,
      produtoId: this.produtoPedidoForm.value.produtoId as number,
      pedidoId: this.produtoPedidoForm.value.pedidoId as number,
    }
    this.produtoPedidoService.cadastarProdutoPedido(requestProduto).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if(response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto adicionado com sucesso',
            life: 2000
          })
          this.dialogRef.close();
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
