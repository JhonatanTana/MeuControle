import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { EventAction } from "../../../../models/interface/event/event-action";
import { PedidoResponse } from "../../../../models/interface/pedido/pedido-response";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { PedidoService } from "../../../../services/pedido/pedido.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { HistoricoListComponent } from "../../components/historico-list/historico-list.component";

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  @Output() pedidoEvent = new EventEmitter<EventAction>();
  public pedidoList: Array<PedidoResponse> = [];
  private ref!: DynamicDialogRef

  ngOnInit(): void {
    this.getAPIPedidoEncerrados()
  }

  constructor(
    private pedidoService: PedidoService,
    private route: Router,
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {}

  getAPIPedidoEncerrados() {
    this.pedidoService.getPedidosEncerrados().pipe(takeUntil(this.destroy$)).subscribe({
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
  handlePedidoAction(event: EventAction): void {
    if (event?.action == 'Historico do Pedido') {
      this.ref = this.dialogService.open(HistoricoListComponent, {
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
        next: () => this.getAPIPedidoEncerrados(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
