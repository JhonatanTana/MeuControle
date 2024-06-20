import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { CardapioResponse } from "../../models/interface/cardapio/cardapio-response";

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
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
    private router: Router,
    private cookie: CookieService,
  ) { }

  getCardapio():Observable<Array<CardapioResponse>> {

    return this.http.get<Array<CardapioResponse>>(`${this.apiUrl}/Categoria/Produtos`,this.httpOptions)
  }
}
