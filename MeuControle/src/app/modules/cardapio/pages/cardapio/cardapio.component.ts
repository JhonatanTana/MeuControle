import { Component, OnInit } from '@angular/core';
import { CardapioService } from "../../../../services/cardapio/cardapio.service";
import { Router } from "@angular/router";
import { CardapioDataTransferService } from "../../../../shared/services/cardapio/cardapio-data-transfer.service";
import { CardapioResponse } from "../../../../models/interface/cardapio/cardapio-response";
import { take } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.scss'
})
export class CardapioComponent implements OnInit {
  public cardapioList: Array<CardapioResponse> = [];

  constructor(
    private cardapioService: CardapioService,
    private route: Router,
    private cardapioDT: CardapioDataTransferService,
    private messageService: MessageService,
  ) {  }

  ngOnInit(): void {
     this.getServicesCardapio();
  }

  getServicesCardapio() {
    const cardapioLoaded = this.cardapioDT.getCardapioData();

    if (cardapioLoaded.length > 0) {
      this.cardapioList = cardapioLoaded;
    } else {
      this.getAPICardapio();
    }
  }

  getAPICardapio() {
    this.cardapioService.getCardapio().pipe(take(1)).subscribe({next:(response) => {
        if (response.length > 0) {
          this.cardapioList = response;
          console.log(this.cardapioList);
        }
      },
      error: (err) => {
        this.route.navigate(["/"])
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Erro ao buscar o cardapio",
          life: 2000
        })
      }
    })
  }
}
