import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardapioResponse } from "../../../../models/interface/cardapio/cardapio-response";
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoEvent } from "../../../../models/enums/produto-event";
import { DeleteProdutoAction } from "../../../../models/interface/event/delete-produto-action";
import { CategoriaEvent } from "../../../../models/enums/categoria-event";

@Component({
  selector: 'app-tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.scss'
})
export class TabelaProdutosComponent {
  @Input() cardapio: Array<CardapioResponse> = []
  @Output() produtoEvent = new EventEmitter<EventAction>();
  @Output() deleteprodutoEvent = new EventEmitter<DeleteProdutoAction>();
  @Output() categoriaEvent = new EventEmitter<EventAction>();

  public addProduto = ProdutoEvent.ADD_PRODUTO_EVENT
  public editProduto = ProdutoEvent.EDIT_PRODUTO
  public addCategoria = CategoriaEvent.ADD_CATEGORIA_EVENT
  public editCategoria = CategoriaEvent.EDIT_CATEGORIA_EVENT

  constructor( ) { }

  handleProdutoEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const produtoEventData = id && id !== 0 ? {action, id} : {action}
      this.produtoEvent.emit(produtoEventData);
    }
  }
  handleCategoriaEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const categoriaEventData = id && id !== 0 ? {action, id} : {action}
      this.categoriaEvent.emit(categoriaEventData);
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
