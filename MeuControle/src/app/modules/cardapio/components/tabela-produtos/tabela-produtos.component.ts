import { Component, Input } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CardapioResponse } from "../../../../models/interface/cardapio/cardapio-response";

@Component({
  selector: 'app-tabela-produtos',
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.scss'
})
export class TabelaProdutosComponent {
  @Input() cardapio: Array<CardapioResponse> = []

  faPenToSquare = faPenToSquare
  faTrash = faTrash

}
