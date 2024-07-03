import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoPedidoResponse } from "../../../../models/interface/pedido/produto-pedido-response";
import { PedidoResponse } from "../../../../models/interface/pedido/pedido-response";
import { Subject, takeUntil } from "rxjs";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormaPagamentoService } from "../../../../services/pagamento/forma-pagamento.service";
import { FormaPagamentoResponse } from "../../../../models/interface/formaPagamento/forma-pagamento-response";
import { PedidoService } from "../../../../services/pedido/pedido.service";
import { ConcluiPedidoRequest } from "../../../../models/interface/pedido/conclui-pedido-request";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-conclui-pedido',
  templateUrl: './conclui-pedido.component.html',
  styleUrl: './conclui-pedido.component.scss'
})
export class ConcluiPedidoComponent implements OnInit,OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  public pedidoList: Array<PedidoResponse> = [];
  public pagamentoList: Array<FormaPagamentoResponse> = []
  public pedidoAction!: {
    event: EventAction,
    pedidoData: Array<PedidoResponse>
  }
  concluiPedidoForm = this.formBuilder.group ({
    pedidoId:[0],
    valorTotal: [0],
    disponibilidade: [false],
    formaPagamento: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogConfig,
    private pagamentoService:FormaPagamentoService,
    private pedidoService: PedidoService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.pedidoAction = this.ref.data;
    this.getPagamento()
  }

  getPagamento(){
    this.pagamentoService.getFormas().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if(response) {
          this.pagamentoList = response
        }
      }
    })
  }
  concluirPedido() {
    const pedidoId = this.pedidoAction.event.id;
    const pedido = this.pedidoAction.pedidoData.find(p => p.pedidoId === pedidoId);
    if (pedido) {
      this.concluiPedidoForm.patchValue({
        pedidoId: pedido.pedidoId,
        valorTotal: pedido.valorTotal
      });
    }
    const requestPedido: ConcluiPedidoRequest = {
      disponibilidade: this.concluiPedidoForm.value.disponibilidade as boolean,
      formaPagamento: this.concluiPedidoForm.value.formaPagamento as string,
      valorTotal: this.concluiPedidoForm.value.valorTotal as number,
      pedidoId: this.concluiPedidoForm.value.pedidoId as number,
    }
    this.pedidoService.concluirPedido(requestPedido).pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pedido encerrado com sucesso',
          life: 2000
        })
        this.dialogRef.close();
        this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/pedidos']);
        });
      },
      error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao encerrar pedido',
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
