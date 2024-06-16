import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { RegistroUsuarioRequest } from "../../models/interface/usuario/registro-usuario-request";
import { Observable } from "rxjs";
import { RegistroUsuarioResponse } from "../../models/interface/usuario/registro-usuario-response";
import { LoginUsuarioRequest } from "../../models/interface/usuario/login-usuario-request";
import { LoginUsuarioResponse } from "../../models/interface/usuario/login-usuario-response";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  registroUsuario(resquestDatas: RegistroUsuarioRequest): Observable<RegistroUsuarioResponse> {

    return this.http.post<RegistroUsuarioResponse>(
      `${this.API_URL}/Auth/Register`,resquestDatas
    )
  }

  login(requestDatas: LoginUsuarioRequest): Observable<LoginUsuarioResponse> {

    return this.http.post<LoginUsuarioResponse>(
      `${this.API_URL}/Auth/Login`, requestDatas
    )
  }
}
