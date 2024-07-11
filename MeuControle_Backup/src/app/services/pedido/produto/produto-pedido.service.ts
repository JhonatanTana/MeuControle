import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ProdutoPedidoResponse } from "../../../models/interface/pedido/produto-pedido-response";
import { CadastroProdutoPedidoRequest } from "../../../models/interface/pedido/cadastro-produto-pedido-request";
import { CategoriaResponse } from "../../../models/interface/categoria/categoria-response";

@Injectable({
  providedIn: 'root'
})
export class ProdutoPedidoService {
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

  getProdutosPedido(id: number) {
    return this.http.get<Array<ProdutoPedidoResponse>>(`${this.apiUrl}/ProdutosPedido/Pedido/${id}`, this.httpOptions);
  }
  cadastarProdutoPedido(requestData: CadastroProdutoPedidoRequest) {
    return this.http.post<ProdutoPedidoResponse>(`${this.apiUrl}/ProdutosPedido`, requestData,this.httpOptions)
  }
  deleteProdutoPedido(id: number) {
    return this.http.delete<Array<ProdutoPedidoResponse>>(`${this.apiUrl}/ProdutosPedido/${id}`, this.httpOptions);
  }
}
