import { Component, OnDestroy, OnInit } from '@angular/core';
import { PedidoService } from "../../../../services/pedido/pedido.service";
import { PedidoResponse } from "../../../../models/interface/pedido/pedido-response";
import { map } from 'rxjs/operators';
import { reduce } from 'rxjs/operators';
import { isSameDay, isSameMonth, parseISO } from 'date-fns';
import { interval, Subject, take, takeUntil } from "rxjs";
import { MessageService } from "primeng/api";
import { ProdutosVendidos } from "../../../../models/interface/dashboard/produtos-vendidos";
import { PedidoStatus } from "../../../../models/interface/dashboard/pedido-status";
import { PedidoFormaPagamento } from "../../../../models/interface/dashboard/pedido-forma-pagamento";
import { PedidoMes } from "../../../../models/interface/dashboard/pedido-mes";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  valorTotalDia: number = 0;
  valorTotalMes: number = 0;
  valorTotal: number = 0;
  chartData: any;
  chartOptions: any;
  chartDataPagamento: any;
  chartOptionsPagamento: any;
  chartDataMes: any;
  chartOptionsMes: any;
  PedidosAberto: PedidoStatus[] = [];
  PedidosEncerrados?: PedidoStatus[] = [] ;

  constructor(
    private pedidoService: PedidoService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getValorPedidosDia()
    this.getValorPedidosMes()
    this.getProdutosMaisVendidos()
    this.getPedidosStatus()
    this.getPedidosFormaPagamento()
    this.getPedidosMes()
  }

  animateValue(start: number, end: number, duration: number) {
    const steps = 100;
    const increment = (end - start) / steps;
    const intervalTime = duration / steps;

    return interval(intervalTime).pipe(
      map(step => start + increment * step),
      take(steps + 1) // +1 para garantir que o último valor seja emitido
    );
  }
  getValorPedidosDia() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    this.pedidoService.getPedidosEncerrados().pipe(
      map(pedidos => pedidos.filter(pedido => {
        const dataPedido = parseISO(pedido.data);
        dataPedido.setHours(0, 0, 0, 0);
        return isSameDay(dataPedido, hoje);
      })),
      map(pedidos => pedidos.map(pedido => pedido.valorTotal)),
      reduce((acc, valorTotalArray) => acc + valorTotalArray.reduce((a, b) => a + b, 0), 0)
    ).subscribe(total => {
      // Animação do valor começando em 0 até o valor total retornado
      this.animateValue(0, total, 750).subscribe(value => {
        this.valorTotalDia = value;
      });
    });
  }
  getValorPedidosMes() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    this.pedidoService.getPedidosEncerrados().pipe(
      map(pedidos => pedidos.filter(pedido => {
        const dataPedido = parseISO(pedido.data);
        // Comparar o mês e o ano usando isSameMonth do date-fns
        return isSameMonth(dataPedido, hoje);
      })),
      map(pedidos => pedidos.map(pedido => pedido.valorTotal)),
      reduce((acc, valorTotalArray) => acc + valorTotalArray.reduce((a, b) => a + b, 0), 0)
    ).subscribe(total => {
      // Animação do valor começando em 0 até o valor total retornado
      this.animateValue(0, total, 750).subscribe(value => {
        this.valorTotalMes = value;
      });
    });
  }
  getPedidosStatus() {
    this.pedidoService.relatorioPedidoStatus().pipe().subscribe({
      next: (response) => {
        if (response) {
          this.PedidosAberto = response.filter(pedido => pedido.disponibilidade);
          this.PedidosEncerrados = response.filter(pedido => !pedido.disponibilidade);
        }
      }
    });
  }
  getProdutosMaisVendidos() {
    this.pedidoService.relatorioProdutosVendidos().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: ProdutosVendidos[]) => {
        if (response) {
          this.chartData = {
            labels: response.map(item => item.produtos.nome),
            datasets: [
              {
                label: 'Quantidade',
                data: response.map(item => item.quantidade),
                backgroundColor: ['#68b2f8', '#506ee5', '#7037cd', '#651f71', '#1d0c20' ],
              }
            ]
          };

          this.chartOptions = {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: false,
                  text: 'Produtos'
                }
              },
              y: {
                display: true,
                title: {
                  display: false,
                  text: 'Quantidade Vendida'
                }
              }
            }
          };
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar os dados para o relatório',
          life: 2000
        });
      }
    });
  }
  getPedidosFormaPagamento() {
    this.pedidoService.relatorioFormaPagamento().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: PedidoFormaPagamento[]) => {
        if (response) {
          this.chartDataPagamento = {
            labels: response.map(item => item.formaPagamento),
            datasets: [
              {
                label: 'Quantidade',
                data: response.map(item => item.quantidade),
                backgroundColor: ['#68b2f8', '#506ee5', '#7037cd', '#651f71', '#1d0c20' ],
              }
            ]
          };

          this.chartOptionsPagamento = {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: false,
                  text: 'Produtos'
                }
              },
              y: {
                display: true,
                title: {
                  display: false,
                  text: 'Quantidade Vendida'
                }
              }
            }
          };
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar os dados para o relatório',
          life: 2000
        });
      }
    });
  }
  getPedidosMes() {
    this.pedidoService.relatorioPedidoMes().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: PedidoMes[]) => {
        if (response) {
          this.chartDataMes = {
            labels: response.map(item => item.mes),
            datasets: [
              {
                label: 'Quantidade',
                data: response.map(item => item.quantidade),
                backgroundColor: ['#68b2f8', '#506ee5', '#7037cd', '#651f71', '#1d0c20' ],
              }
            ]
          };

          this.chartOptionsMes = {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: false,
                  text: 'Produtos'
                }
              },
              y: {
                display: true,
                title: {
                  display: false,
                  text: 'Quantidade Vendida'
                }
              }
            }
          };
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar os dados para o relatório',
          life: 2000
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
