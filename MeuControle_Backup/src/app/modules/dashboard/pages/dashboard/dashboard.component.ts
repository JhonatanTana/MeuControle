import { Component, OnInit } from '@angular/core';
import { PedidoService } from "../../../../services/pedido/pedido.service";
import { PedidoResponse } from "../../../../models/interface/pedido/pedido-response";
import { map, tap } from 'rxjs/operators';
import { reduce } from 'rxjs/operators';
import { isSameDay, isSameMonth, parseISO } from 'date-fns';
import { format } from "date-fns-tz";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public pedidoList: Array<PedidoResponse> = [];
  valorTotalDia: number = 0;
  valorTotalMes: number = 0;
  valorTotal: number = 0;

  constructor(
    private pedidoService: PedidoService,
  ) { }

  ngOnInit(): void {
    this.getValorPedidos()
    this.getValorPedidosDia()
    this.getValorPedidosMes()
  }

  getValorPedidos() {
    this.pedidoService.getPedidosEncerrados().pipe(
      map(pedidos => pedidos.map(pedido => pedido.valorTotal)),
      reduce((acc, valorTotalArray) => acc + valorTotalArray.reduce((a, b) => a + b, 0), 0)
    ).subscribe(total => {
      this.valorTotal = total;
    });
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
      this.valorTotalDia = total;
    });
  }
  getValorPedidosMes() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    this.pedidoService.getPedidosEncerrados().pipe(
      tap(pedidos => console.log("Pedidos recebidos:", pedidos)),
      map(pedidos => pedidos.filter(pedido => {
        const dataPedido = parseISO(pedido.data);

        console.log(`Data do Pedido: ${format(dataPedido, 'yyyy-MM')}, Mês Atual: ${format(hoje, 'yyyy-MM')}`);

        // Comparar o mês e o ano usando isSameMonth do date-fns
        return isSameMonth(dataPedido, hoje);
      })),
      tap(pedidosFiltrados => console.log("Pedidos filtrados:", pedidosFiltrados)),
      map(pedidos => pedidos.map(pedido => pedido.valorTotal)),
      reduce((acc, valorTotalArray) => acc + valorTotalArray.reduce((a, b) => a + b, 0), 0)
    ).subscribe(total => {
      console.log("Valor total dos pedidos do mês atual:", total);
      this.valorTotalMes = total;
    });
  }
}
