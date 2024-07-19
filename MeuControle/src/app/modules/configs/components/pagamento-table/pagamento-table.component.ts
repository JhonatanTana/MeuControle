import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { EventAction } from "../../../../models/interface/event/event-action";
import { CategoriaResponse } from "../../../../models/interface/categoria/categoria-response";
import { Router } from "@angular/router";
import { InativaPagamentoRequest } from "../../../../models/interface/formaPagamento/inativa-pagamento-request";
import { FormaPagamentoService } from "../../../../services/pagamento/forma-pagamento.service";
import { MessageService } from "primeng/api";
import { FormaPagamentoResponse } from "../../../../models/interface/formaPagamento/forma-pagamento-response";
import { PagamentoEvent } from "../../../../models/enums/pagamento-event";

@Component({
  selector: 'app-pagamento-table',
  templateUrl: './pagamento-table.component.html',
  styleUrl: './pagamento-table.component.scss'
})
export class PagamentoTableComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  @Output() categoriaEvent = new EventEmitter<EventAction>();
  @Input() forma: Array<FormaPagamentoResponse> = []

  addPagamento = PagamentoEvent.addPagamento

  constructor(
    private route: Router,
    private pagamentoService: FormaPagamentoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  handlePagamentoEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const categoriaEventData = id && id !== 0 ? {action, id} : {action}
      this.categoriaEvent.emit(categoriaEventData);
    }
  }
  voltar() {
    this.route.navigate(['/configs']); // Substitua '/home' pela rota desejada
  }
  InativarPagamento(id:number, disponibilidade: boolean) {
    const requestData: InativaPagamentoRequest = {
      pagamentoId: id,
      disponibilidade: disponibilidade
    }
    this.pagamentoService.desativar(requestData).pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        if(response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: disponibilidade ? 'Pagamento ativado' : 'Pagamento desativado',
            life: 2000
          })
        }
      }
    })
    //this.RecarregarPagina()
  }
  RecarregarPagina() {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/configs/formapagamento']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
