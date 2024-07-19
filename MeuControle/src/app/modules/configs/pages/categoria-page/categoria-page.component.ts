import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from "rxjs";
import { CategoriaService } from "../../../../services/categoria/categoria.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { CategoriaResponse } from "../../../../models/interface/categoria/categoria-response";
import { EventAction } from "../../../../models/interface/event/event-action";
import { CategoriaFormComponent } from "../../components/categoria-form/categoria-form.component";

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrl: './categoria-page.component.scss'
})
export class CategoriaPageComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  public categoriaList: Array<CategoriaResponse> = [];
  private ref!: DynamicDialogRef

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) {  }

  ngOnInit(): void {
    this.getAPICategoria()
  }

  getAPICategoria() {
    this.categoriaService.getCategorias().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.categoriaList = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Erro ao buscar as categorias",
          life: 2000
        })
      }
    })
  }
  handleCategoriaAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(CategoriaFormComponent, {
        header: event?.action,
        width: '25rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: {
          event: event,
          categoriasData: this.categoriaList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPICategoria(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
