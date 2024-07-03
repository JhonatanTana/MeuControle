import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { FormaPagamentoResponse } from "../../models/interface/formaPagamento/forma-pagamento-response";

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {
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

  getFormas() {
    return this.http.get<Array<FormaPagamentoResponse>>(`${this.apiUrl}/FormaPagamento`,this.httpOptions)
  }
}
