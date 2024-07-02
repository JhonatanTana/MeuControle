import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { PedidoResponse } from "../../models/interface/pedido/pedido-response";

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

    return this.http.get<Array<PedidoResponse>>(`${this.apiUrl}/Pedidos`,this.httpOptions)
  }
}
