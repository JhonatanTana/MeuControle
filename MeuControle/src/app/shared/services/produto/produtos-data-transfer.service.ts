import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from "rxjs";
import { ProdutoResponse } from "../../../models/interface/produto/produto-response";

@Injectable({
  providedIn: 'root'
})
export class ProdutosDataTransferService {

  public produtoDataEmitter = new BehaviorSubject<Array<ProdutoResponse> | null>(null)

  public produtoData: Array<ProdutoResponse> = [];

  setProdutoData(produto: Array<ProdutoResponse>): void {
    if (produto) {
      this.produtoDataEmitter.next(produto);
      this.getProdutoData();
    }
  }

  getProdutoData() {
    this.produtoDataEmitter.pipe(take(1)).subscribe({next:(response) => {
        if (response) {
          this.produtoData = response;
        }
      }
    });
    return this.produtoData;
  }
}
