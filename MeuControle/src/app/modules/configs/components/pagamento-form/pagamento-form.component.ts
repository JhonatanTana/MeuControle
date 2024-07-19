import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Router } from "@angular/router";
import { FormaPagamentoRequest } from "../../../../models/interface/formaPagamento/forma-pagamento-request";
import { FormaPagamentoService } from "../../../../services/pagamento/forma-pagamento.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-pagamento-form',
  templateUrl: './pagamento-form.component.html',
  styleUrl: './pagamento-form.component.scss'
})
export class PagamentoFormComponent implements OnDestroy {
  private readonly destroy$:Subject<void> = new Subject()

  constructor(
    private formBuilder: FormBuilder,
    private pagamentoService: FormaPagamentoService,
    private messageService: MessageService,
    public dialogRef: DynamicDialogRef,
    private route: Router,
  ) { }

  pagamentoForm = this.formBuilder.group({
    Nome: ['', Validators.required],
    Disponibilidade: [false]
  })

  cadastrarPagamento() {
    const requestData: FormaPagamentoRequest = {
      nome: this.pagamentoForm.value.Nome as string,
      disponibilidade: this.pagamentoForm.value.Disponibilidade as boolean
    }
    this.pagamentoService.cadastrarFormas(requestData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if(response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Forma de Pagamento cadastrada',
            life: 2000
          })
          this.dialogRef.close();
          this.recarregarPagina();
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao cadastrar forma de pagamento',
          life: 2000
        });
      }
    })
  }
  recarregarPagina() {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/configs/formapagamento']); // Navega para a mesma rota (/cardapio)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
