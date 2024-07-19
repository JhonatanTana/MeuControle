import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoEvent } from "../../../../models/enums/produto-event";
import { DeleteProdutoAction } from "../../../../models/interface/event/delete-produto-action";
import { ProdutoResponse } from "../../../../models/interface/produto/produto-response";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.scss'
})
export class TabelaProdutosComponent {
  @Input() cardapio: Array<ProdutoResponse> = []
  @Output() produtoEvent = new EventEmitter<EventAction>();
  @Output() deleteprodutoEvent = new EventEmitter<DeleteProdutoAction>();

  public addProduto = ProdutoEvent.ADD_PRODUTO_EVENT
  public editProduto = ProdutoEvent.EDIT_PRODUTO

  constructor(
    private route: Router
  ) { }

  handleProdutoEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const produtoEventData = id && id !== 0 ? {action, id} : {action}
      this.produtoEvent.emit(produtoEventData);
    }
  }
  handleDeleteProduto(id: number, nome: string): void {
    if (id !== 0 && nome !== '') {
      this.deleteprodutoEvent.emit({
        id,
        nome,
      })
    }
  }
}
