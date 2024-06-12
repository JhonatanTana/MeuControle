import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit, OnDestroy {

  faPenToSquare = faPenToSquare;

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}
