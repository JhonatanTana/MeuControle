import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from "rxjs";
import { CategoriaResponse } from "../../../models/interface/categoria/categoria-response";

@Injectable({
  providedIn: 'root'
})
export class CategoriaDataTransferService {

  public categoriaDataEmitter = new BehaviorSubject<Array<CategoriaResponse> | null>(null)

  public categoriaData: Array<CategoriaResponse> = [];

  setCategoriaData(categoria: Array<CategoriaResponse>): void {
    if (categoria) {
      this.categoriaDataEmitter.next(categoria);
      this.getCategoriaData();
    }
  }

  getCategoriaData() {
    this.categoriaDataEmitter.pipe(take(1)).subscribe({next:(response) => {
        if (response) {
          this.categoriaData = response;
        }
      }
    });
    return this.categoriaData;
  }
}
