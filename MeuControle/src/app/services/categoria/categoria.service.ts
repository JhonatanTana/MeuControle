import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { CategoriaResponse } from "../../models/interface/categoria/categoria-response";
import { CategoriaRequest } from "../../models/interface/categoria/categoria-request";
import { InativaCategoria } from "../../models/interface/categoria/inativa-categoria";


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
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

  getCategorias():Observable<Array<CategoriaResponse>> {

    return this.http.get<Array<CategoriaResponse>>(`${this.apiUrl}/Categoria`,this.httpOptions)
  }
  getCategoriasAtivas():Observable<Array<CategoriaResponse>> {

    return this.http.get<Array<CategoriaResponse>>(`${this.apiUrl}/Categoria/Ativas`,this.httpOptions)
  }
  cadastrarCategoria(requestData:CategoriaRequest){
    return this.http.post<CategoriaResponse>(`${this.apiUrl}/Categoria`, requestData,this.httpOptions)
  }
  editarCategoria(requestData:CategoriaRequest){
    return this.http.put<void>(`${this.apiUrl}/Categoria`, requestData,this.httpOptions)
  }
  desativarCategoria(requestData:InativaCategoria){
    return this.http.patch<InativaCategoria>(`${this.apiUrl}/Categoria`, requestData,this.httpOptions)
  }
}
