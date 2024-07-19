import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { EventAction } from "../../../../models/interface/event/event-action";
import { CategoriaEvent } from "../../../../models/enums/categoria-event";
import { CategoriaResponse } from "../../../../models/interface/categoria/categoria-response";
import { InativaCategoria } from "../../../../models/interface/categoria/inativa-categoria";
import { CategoriaService } from "../../../../services/categoria/categoria.service";
import { Subject, take, takeUntil } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-categoria-table',
  templateUrl: './categoria-table.component.html',
  styleUrl: './categoria-table.component.scss'
})
export class CategoriaTableComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  @Output() categoriaEvent = new EventEmitter<EventAction>();
  @Input() categoria: Array<CategoriaResponse> = []

  public addCategoria = CategoriaEvent.ADD_CATEGORIA_EVENT
  public editCategoria = CategoriaEvent.EDIT_CATEGORIA_EVENT

  constructor(
    private route: Router,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
  ) {  }

  ngOnInit(): void {

  }

  voltar() {
    this.route.navigate(['/configs']); // Substitua '/home' pela rota desejada
  }
  handleCategoriaEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const categoriaEventData = id && id !== 0 ? {action, id} : {action}
      this.categoriaEvent.emit(categoriaEventData);
    }
  }
  InativaCategoria(categoriaId:number, disponibilidade: boolean) {
    const requestData: InativaCategoria = {
      categoriaId: categoriaId,
      disponibilidade: disponibilidade
    }
    this.categoriaService.desativarCategoria(requestData).pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        if(response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: disponibilidade ? 'Categoria ativada' : 'Categoria desativada',
            life: 2000
          })
        }
      }
    })
    //this.RecarregarPagina()
  }
  RecarregarPagina() {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/configs/categorias']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
