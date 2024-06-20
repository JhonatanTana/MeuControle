import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { RegistroUsuarioRequest } from "../../models/interface/usuario/registro-usuario-request";
import { Observable } from "rxjs";
import { RegistroUsuarioResponse } from "../../models/interface/usuario/registro-usuario-response";
import { LoginUsuarioRequest } from "../../models/interface/usuario/login-usuario-request";
import { LoginUsuarioResponse } from "../../models/interface/usuario/login-usuario-response";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = environment.API_URL;

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
}
