  import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
  import { Table } from "primeng/table";
  import { PedidoResponse } from "../../../../models/interface/pedido/pedido-response";
  import { Subject, takeUntil } from "rxjs";
  import { FormaPagamentoService } from "../../../../services/pagamento/forma-pagamento.service";
  import { FormaPagamentoResponse } from "../../../../models/interface/formaPagamento/forma-pagamento-response";
  import { PedidoService } from "../../../../services/pedido/pedido.service";
  import { PedidoCompletoResponse } from "../../../../models/interface/pedido/pedido-completo-response";
  import { EventAction } from "../../../../models/interface/event/event-action";
  import { PedidoEvent } from "../../../../models/enums/pedido-event";

  @Component({
    selector: 'app-historico-table',
    templateUrl: './historico-table.component.html',
    styleUrl: './historico-table.component.scss'
  })
  export class HistoricoTableComponent implements OnInit, OnDestroy {
    private readonly destroy$:Subject<void> = new Subject()
    @Input() pedido: Array<PedidoResponse> = []
    @Output() pedidoEvent = new EventEmitter<EventAction>();
    public pagamentoList: Array<FormaPagamentoResponse> = []
    public pedidoList: Array<PedidoCompletoResponse> = [];
    dataSearchValue: string = '';
    nomeSearchValue: string = '';
    pagamentoSearchValue: string = '';

    public historicoPedido = PedidoEvent.HISTORICO

    applyFilters(table: any) {
      table.filter(this.nomeSearchValue, 'nome', 'contains');
      table.filter(this.dataSearchValue, 'data', 'contains');
      table.filter(this.pagamentoSearchValue, 'formaPagamento', 'contains')
    }
    clear(table: Table) {
      table.clear();
      this.dataSearchValue = ''
      this.nomeSearchValue = ''
      this.pagamentoSearchValue = '';
    }
    data: Array<PedidoCompletoResponse> =[];

    constructor(
      private pagamentoService:FormaPagamentoService,
      private pedidoService: PedidoService,
    ) { }

    ngOnInit() {
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
    handlePedidoEvent(action: string, id?: number): void {
      if (action && action !== '') {
        const produtoEventData = id && id !== 0 ? {action, id} : {action}
        this.pedidoEvent.emit(produtoEventData);
      }
    }
    imprimirPedido(id: number): void {
      this.pedidoService.getPedidoCompleto(id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (response) {
            // @ts-ignore
            this.pedidoList = [response]; // Certifique-se de que `response` é um objeto ou uma lista
            this.executePrint();
          }
        },
        error: (err) => {
          console.error('Erro ao buscar pedido completo:', err);
        }
      });
    }
    generatePrintContents(): string {

      let html = '<table>';
      html += '<thead><tr><th>Nome</th><th>Qtd</th><th>Preço</th></tr></thead><tbody>';

      this.pedidoList.forEach(pedido => {
        // @ts-ignore
        pedido.produtosPedido.forEach(produtoPedido => {
          const nome = produtoPedido.produto.nome;
          const quantidade = produtoPedido.quantidade;
          const precoFormatado = produtoPedido.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          html += `<tr><td>${nome}</td><td>${quantidade}</td><td>${precoFormatado}</td></tr>`;
        });

        const valorTotalFormatado = pedido.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const formaPagamento = pedido.formaPagamento;

        // Adicionar espaço entre forma de pagamento e produtos
        html += `<tr></tr><tr><td colspan="3">&nbsp;</td></tr>`;

        // Incluir forma de pagamento e total
        html += `<tr><td colspan="2"><strong>Total</strong></td><td><strong>${valorTotalFormatado}</strong></td></tr>`;
        html += `<tr><td colspan="2"><strong>Forma de Pagamento</strong></td><td>${formaPagamento}</td></tr>`;
      });

      html += '</tbody></table>';
      return html;
    }
    executePrint() {
      const printContents = this.generatePrintContents();
      const printWindow = window.open('', '', 'width=300,height=600');
      if (printWindow) {
        printWindow.document.write(`
        <html>
          <head>
            <title>Detalhes do Pedido</title>
            <style>
              @media print {
                @page {
                  size: 80mm; /* Largura fixa de 80mm e altura dinâmica */
                }
              }
              /* Estilos adicionais fora da mídia de impressão */
              body {
                font-family: 'Courier New', Courier, monospace;
                font-size: 12px;
                width: 80mm; /* Largura típica de um papel de cupom */
              }

              table {
                width: 100%;
                border-collapse: collapse;
              }

              th, td {
                padding: 5px;
                text-align: left;
              }

              .header {
                text-align: center;
                margin-bottom: 10px;
              }

              .footer {
                text-align: center;
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>CommandaApp</h2>
              <p>Rua Brasil, 123</p>
              <p>Telefone: (00) 1234-5678</p>
            </div>
            ${printContents}
            <div class="footer">
              <p>Obrigado pela sua compra!</p>
            </div>
          </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        //printWindow.close();
      }
    }


    ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
    }
  }
