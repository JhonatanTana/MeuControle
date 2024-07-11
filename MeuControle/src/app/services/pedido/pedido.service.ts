import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { PedidoResponse } from "../../models/interface/pedido/pedido-response";
import { ConcluiPedidoRequest } from "../../models/interface/pedido/conclui-pedido-request";
import { PedidoRequest } from "../../models/interface/pedido/pedido-request";
import { PedidoCompletoResponse } from "../../models/interface/pedido/pedido-completo-response";
import { ProdutosVendidos } from "../../models/interface/dashboard/produtos-vendidos";
import { PedidoStatus } from "../../models/interface/dashboard/pedido-status";
import { PedidoFormaPagamento } from "../../models/interface/dashboard/pedido-forma-pagamento";
import { PedidoMes } from "../../models/interface/dashboard/pedido-mes";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = environment.API_URL;
  private token = this.cookie.get("UserInfo")
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    })
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
  ) { }

  getPedidosAbertos():Observable<Array<PedidoResponse>> {
    return this.http.get<Array<PedidoResponse>>(`${this.apiUrl}/Pedidos/Abertos`,this.httpOptions)
  }
  getPedidosEncerrados():Observable<Array<PedidoResponse>> {
    return this.http.get<Array<PedidoResponse>>(`${this.apiUrl}/Pedidos/Encerrados`,this.httpOptions)
  }
  getPedidoCompleto(id: number):Observable<Array<PedidoCompletoResponse>> {
    return this.http.get<Array<PedidoCompletoResponse>>(`${this.apiUrl}/Pedidos/Completo/${id}`,this.httpOptions)
  }
  novoPedido(requestData: PedidoRequest) {
    return this.http.post<PedidoResponse>(`${this.apiUrl}/Pedidos`, requestData,this.httpOptions)
  }
  concluirPedido(requestData:ConcluiPedidoRequest): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/Conclui`, requestData,this.httpOptions)
  }
  relatorioProdutosVendidos(): Observable<Array<ProdutosVendidos>> {
    return this.http.get<Array<ProdutosVendidos>>(`${this.apiUrl}/ProdutosPedido/Dashboard`,this.httpOptions)
  }
  relatorioPedidoStatus(): Observable<Array<PedidoStatus>> {
    return this.http.get<Array<PedidoStatus>>(`${this.apiUrl}/Pedidos/Relatorio/StatusPedido`,this.httpOptions)
  }
  relatorioFormaPagamento(): Observable<Array<PedidoFormaPagamento>> {
    return this.http.get<Array<PedidoFormaPagamento>>(`${this.apiUrl}/Pedidos/Relatorio/FormaPagamento`,this.httpOptions)
  }
  relatorioPedidoMes(): Observable<Array<PedidoMes>> {
    return this.http.get<Array<PedidoMes>>(`${this.apiUrl}/Pedidos/Relatorio/Pedido/Mes`,this.httpOptions)
  }
}
