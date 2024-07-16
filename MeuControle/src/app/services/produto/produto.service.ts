import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ProdutoResponse } from "../../models/interface/produto/produto-response";
import { ProdutoRequest } from "../../models/interface/produto/produto-request";
import { DeleteProdutoResponse } from "../../models/interface/produto/delete-produto-response";
import { EditProdutoRequest } from "../../models/interface/produto/edit-produto-request";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = environment.API_URL;
  private token = this.cookie.get("UserInfo")
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    })
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
  ) { }

  getProduto():Observable<Array<ProdutoResponse>> {
    return this.http.get<Array<ProdutoResponse>>(`${this.apiUrl}/Produto`,this.httpOptions)
  }
  getProdutoAtivo():Observable<Array<ProdutoResponse>> {
    return this.http.get<Array<ProdutoResponse>>(`${this.apiUrl}/Produto/Disponivel`,this.httpOptions)
  }
  cadastrarProduto(produto: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Produto`, produto, this.httpOptions);
  }
  deletarProduto(id: number): Observable<DeleteProdutoResponse> {
    return this.http.delete<DeleteProdutoResponse>(`${this.apiUrl}/Produto/${id}`,{
      ...this.httpOptions, params: {
        id: id
      }
    });
  }
  editarProduto(requestData:EditProdutoRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Produto`, requestData,this.httpOptions)
  }
}
