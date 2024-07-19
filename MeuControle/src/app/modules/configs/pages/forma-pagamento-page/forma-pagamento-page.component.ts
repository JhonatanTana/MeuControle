import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormaPagamentoService } from "../../../../services/pagamento/forma-pagamento.service";
import { Router } from "@angular/router";
import { FormaPagamentoResponse } from "../../../../models/interface/formaPagamento/forma-pagamento-response";
import { EventAction } from "../../../../models/interface/event/event-action";
import { CategoriaFormComponent } from "../../components/categoria-form/categoria-form.component";
import { PagamentoFormComponent } from "../../components/pagamento-form/pagamento-form.component";

@Component({
  selector: 'app-forma-pagamento-page',
  templateUrl: './forma-pagamento-page.component.html',
  styleUrl: './forma-pagamento-page.component.scss'
})
export class FormaPagamentoPageComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  private ref!: DynamicDialogRef
  public formaPagamentoList: Array<FormaPagamentoResponse> = [];

  constructor(
    private pagamentoService: FormaPagamentoService,
    private route: Router,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getPagamento()
  }

  getPagamento() {
    this.pagamentoService.getTodasFormas().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response) {
          this.formaPagamentoList = response
        }
      }
    })
  }
  handlePagamentoAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(PagamentoFormComponent, {
        header: event?.action,
        width: '25rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: {
          event: event,
          categoriasData: this.formaPagamentoList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getPagamento(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
