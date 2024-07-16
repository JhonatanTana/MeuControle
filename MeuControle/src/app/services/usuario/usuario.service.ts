import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { RegistroUsuarioRequest } from "../../models/interface/usuario/registro-usuario-request";
import { Observable } from "rxjs";
import { RegistroUsuarioResponse } from "../../models/interface/usuario/registro-usuario-response";
import { LoginUsuarioRequest } from "../../models/interface/usuario/login-usuario-request";
import { LoginUsuarioResponse } from "../../models/interface/usuario/login-usuario-response";
import { CookieService } from "ngx-cookie-service";
import { UsuarioResponse } from "../../models/interface/usuario/usuario-response";
import { RedefinirSenhaRequest } from "../../models/interface/usuario/redefinir-senha-request";
import { DeletaUsuario } from "../../models/interface/usuario/deleta-usuario";
import { InativaUsuario } from "../../models/interface/usuario/inativa-usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = environment.API_URL;
  private token = this.cookie.get("UserInfo")
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    })
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService
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
  } // realiza a validação do usuario
  estaLogado():boolean {
    const  JWD_TOKEN = this.cookie.get('UserInfo')
    return JWD_TOKEN ? true : false
  } // verifica se ha um cookie com o Token JWT
  TokenExpirado(): boolean {
    const userExpiration = this.cookie.get('UserExpiration');
    if (!userExpiration) {
      return true;
    }

    const decodedExpiration = decodeURIComponent(userExpiration);

    const expirationDate = new Date(decodedExpiration);
    const now = new Date();

    const expirado = now >= expirationDate;

    return expirado;
  } // deleta o cookie caso o token esteja expirado
  deleteToken(): void {
    this.cookie.delete('UserInfo');
    this.cookie.delete('UserExpiration');
  } // deleta o token JWT dos cookie
  getUsuarios(): Observable<Array<UsuarioResponse>> {
    return this.http.get<Array<UsuarioResponse>>(`${this.API_URL}/Auth/Usuarios`,this.httpOptions)
  }
  redefinirSenha(requestDatas: RedefinirSenhaRequest): Observable<RedefinirSenhaRequest> {
    return this.http.patch<RedefinirSenhaRequest>(
      `${this.API_URL}/Auth/ResetSenha`,requestDatas, this.httpOptions
    )
  }
  deletarusuario(userId:string): Observable<DeletaUsuario> {
    return this.http.delete<any>(`${this.API_URL}/Auth`, {
      ...this.httpOptions, params: {
        userId: userId
      }
    });
  }
  inativarUsuario(requestDatas: InativaUsuario): Observable<InativaUsuario> {
    return this.http.patch<InativaUsuario>(`${this.API_URL}/Auth/Desativa`,requestDatas, this.httpOptions)
  }
}
