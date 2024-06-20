import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from "rxjs";
import { CardapioResponse } from "../../../models/interface/cardapio/cardapio-response";

@Injectable({
  providedIn: 'root'
})
export class CardapioDataTransferService {

  public cardapioDataEmitter$ = new BehaviorSubject<Array<CardapioResponse> | null>(null);

  public cardapioData: Array<CardapioResponse> = [];

  setCadapioData(cardapio: Array<CardapioResponse>): void {
    if(cardapio) {
      this.cardapioDataEmitter$.next(cardapio);
      this.getCardapioData();
    }
  }

  getCardapioData() {
    this.cardapioDataEmitter$.pipe(take(1)).subscribe({next:(response) => {
        if (response) {
          this.cardapioData = response;
        }
      }
    });
    return this.cardapioData;
  }
}
