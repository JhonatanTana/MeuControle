import { Component, OnDestroy, OnInit } from '@angular/core';
import { format } from "date-fns-tz";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";

import { PedidoService } from "../../../../services/pedido/pedido.service";
import { PedidoRequest } from "../../../../models/interface/pedido/pedido-request";
import { Subject, takeUntil } from "rxjs";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: 'app-novo-pedido-form',
  templateUrl: './novo-pedido-form.component.html',
  styleUrl: './novo-pedido-form.component.scss'
})
export class NovoPedidoFormComponent implements OnInit,OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()
  public dataDeHoje: string;

  novoPedidoForm = this.formBuilder.group({
    Nome: ['', Validators.required],
    Mesa: [0, Validators.required],
    Data: [''],
    Disponibilidade: [true],
  });

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private pedidoService: PedidoService,
    public dialogRef: DynamicDialogRef,
  ) { this.dataDeHoje = format(new Date(), 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' }); }

  ngOnInit(): void {

  }

  criarPedido() {
    this.novoPedidoForm.patchValue({
      Data: this.dataDeHoje,
    });

    const requestPedido: PedidoRequest = {
      nome: this.novoPedidoForm.value.Nome as string,
      mesa: this.novoPedidoForm.value.Mesa as number,
      data: this.novoPedidoForm.value.Data as string,
      disponibilidade: this.novoPedidoForm.value.Disponibilidade as boolean,
    };
    this.pedidoService.novoPedido(requestPedido).pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        if(response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Pedido criado com sucesso',
            life: 2000
          })
          this.dialogRef.close();
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/pedidos']);
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao criar pedido',
          life: 2000
        });
        console.error('Erro ao adicionar produto:', err);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
