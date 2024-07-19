import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardapioService } from "../../../../services/cardapio/cardapio.service";
import { Router } from "@angular/router";
import { CardapioResponse } from "../../../../models/interface/cardapio/cardapio-response";
import { Subject, take, takeUntil } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoService } from "../../../../services/produto/produto.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProdutoComponent } from "../../components/produto/produto.component";
import { ProdutoResponse } from "../../../../models/interface/produto/produto-response";


@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.scss'
})
export class CardapioComponent implements OnInit,OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  private ref!: DynamicDialogRef
  public cardapioList: Array<CardapioResponse> = [];
  public produtoList: Array<ProdutoResponse> = [];

  constructor(
    private cardapioService: CardapioService,
    private produtoService: ProdutoService,
    private route: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) {  }

  ngOnInit(): void {
     this.getAPIProduto()
  }

  getAPICardapio() {
    this.cardapioService.getCardapio().pipe(take(1)).subscribe({next:(response) => {
        if (response.length > 0) {
          this.cardapioList = response;
        }
      },
      error: (err) => {
        this.route.navigate(["/"])
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Erro ao buscar o cardapio",
          life: 2000
        })
      }
    })
  }
  getAPIProduto() {
    this.produtoService.getProduto().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.produtoList = response;
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
  handleProdutoAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ProdutoComponent, {
        header: event?.action,
        width: '25rem',
        draggable: true,
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          produtosData: this.produtoList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPICardapio(),
      });
    }
  }
  handleDeleteProdutoAction(event: { id: number, nome: string }): void {
    if(event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusao do produto ${event?.nome} ? <br><br> Isso afetará o historico de Pedidos`,
        header: "Confirmação de Exclusão",

        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => this.deleteProduto(event.id),
      })
    }
  }
  deleteProduto(id: number) {
    if (id) {
      this.produtoService.deletarProduto(id).pipe(takeUntil(this.destroy$)).subscribe({
        next:(response) => {
          if(response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: "Produto deletado com sucesso",
              life: 2000
            });
            this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.route.navigate(['/cardapio']);
            });          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Erro ao deletar o produto",
            life: 2000
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
