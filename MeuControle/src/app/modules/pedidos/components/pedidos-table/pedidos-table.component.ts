import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PedidoResponse } from "../../../../models/interface/pedido/pedido-response";
import { Table } from "primeng/table";
import { EventAction } from "../../../../models/interface/event/event-action";
import { DeleteProdutoAction } from "../../../../models/interface/event/delete-produto-action";
import { PedidoEvent } from "../../../../models/enums/pedido-event";


@Component({
  selector: 'app-pedidos-table',
  templateUrl: './pedidos-table.component.html',
  styleUrl: './pedidos-table.component.scss'
})
export class PedidosTableComponent implements OnInit {
  @Input() pedido: Array<PedidoResponse> = []
  @Output() pedidoEvent = new EventEmitter<EventAction>();
  dataSearchValue: string = '';
  nomeSearchValue: string = '';

  public addProduto = PedidoEvent.ADD_PEDIDO
  public concluiPedido = PedidoEvent.EDIT_PEDIDO
  public adicionaProdutoPedido = PedidoEvent.ADD_PRODUTO_PEDIDO

  applyFilters(table: any) {
    table.filter(this.nomeSearchValue, 'nome', 'contains');
    table.filter(this.dataSearchValue, 'mesa', 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.dataSearchValue = ''
    this.nomeSearchValue = ''
  }

  ngOnInit(): void {

  }

  handlePedidoEvent(action: string, id?: number): void {
    if (action && action !== '') {
      const produtoEventData = id && id !== 0 ? {action, id} : {action}
      this.pedidoEvent.emit(produtoEventData);
    }
  }
}
