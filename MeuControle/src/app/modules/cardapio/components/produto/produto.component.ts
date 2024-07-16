import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ProdutoService } from "../../../../services/produto/produto.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { CategoriaResponse } from "../../../../models/interface/categoria/categoria-response";
import { CardapioResponse } from "../../../../models/interface/cardapio/cardapio-response";
import { ProdutoRequest } from "../../../../models/interface/produto/produto-request";
import { CategoriaService } from "../../../../services/categoria/categoria.service";
import { Subject, takeUntil } from "rxjs";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EventAction } from "../../../../models/interface/event/event-action";
import { ProdutoResponse } from "../../../../models/interface/produto/produto-response";
import { ProdutosDataTransferService } from "../../../../shared/services/produto/produtos-data-transfer.service";
import { ProdutoEvent } from "../../../../models/enums/produto-event";
import { EditProdutoRequest } from "../../../../models/interface/produto/edit-produto-request";

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject()
  public categoriaList: Array<CategoriaResponse> = [];
  public produtoList: Array<ProdutoResponse> = [];
  public produtoAction!: {
    event: EventAction,
    produtosData: Array<ProdutoResponse>
  }
  public produtoSelecionadoData!: ProdutoResponse;
  @Input() cardapio: Array<CardapioResponse> = []

  produtoForm = this.formBuilder.group({
    Nome: ['', [Validators.required]],
    Preco: [0, [Validators.required, Validators.min(1)]],
    CategoriaId: [0 , [Validators.required, Validators.minLength(1)]],
    Disponibilidade: [false],
    File: [null]
  });
  editProdutoForm = this.formBuilder.group({
    Nome: ['', [Validators.required]],
    Preco: [0, [Validators.required, Validators.min(1)]],
    CategoriaId: [0 , [Validators.required, Validators.minLength(1)]],
    Disponibilidade: [false],
  })

  public addProdutoAction = ProdutoEvent.ADD_PRODUTO_EVENT
  public editProdutoAction = ProdutoEvent.EDIT_PRODUTO
  public deleteProdutoAction = ProdutoEvent.EXCLUIR_PRODUTO

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private produtoDTService: ProdutosDataTransferService,
    private messageService: MessageService,
    private route: Router,
    private categoriaService: CategoriaService,
    public ref: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,

  ) {  }

  ngOnInit(): void {
    this.produtoAction = this.ref.data

    if (this.produtoAction?.event?.action === this.editProdutoAction && this.produtoAction?.produtosData) {
      this.getProdutoSelecionado(this.produtoAction.event.id as number)
    }
    this.produtoAction?.event?.action === this.deleteProdutoAction && this.getProdutoData()

    this.getAPICategoria()
  }

  getAPICategoria() {
    this.categoriaService.getCategoriasAtivas().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.categoriaList = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Erro ao buscar as categorias",
          life: 2000
        })
      }
    })
  } //recupera as categorias na API
  handleSubmitAddProduto() {
    if (this.produtoForm?.valid && this.produtoForm.value) {
      const formData = new FormData();
      formData.append('Nome', this.produtoForm.value.Nome as string);
      // @ts-ignore
      formData.append('Preco', this.produtoForm.value.Preco as number);
      // @ts-ignore
      formData.append('Disponibilidade', this.produtoForm.value.Disponibilidade as boolean);
      // @ts-ignore
      formData.append('CategoriaId', this.produtoForm.value.CategoriaId as number);
      // @ts-ignore
      formData.append('file', this.produtoForm.get('File')?.value);

      // @ts-ignore
      this.produtoService.cadastrarProduto(formData).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (response) {}
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto criado com sucesso',
            life: 2000
          });
          this.dialogRef.close();
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/cardapio']);
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: "Erro ao ao cadastrar o produto",
            life: 2000
          });
        }
      });
    }
  } //cadastra um novo produto
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      // @ts-ignore
      this.produtoForm.patchValue({ File: input.files[0] });
    }
  }
  handleSubmitEditProduto() {
    if (this.editProdutoForm?.valid && this.editProdutoForm.value && this.produtoAction.event.id) {
      const produtoEditado: EditProdutoRequest = {
        produtoId: this.produtoAction?.event?.id,
        nome: this.editProdutoForm.value.Nome as string,
        preco: this.editProdutoForm.value.Preco as number,
        disponibilidade: this.editProdutoForm.value.Disponibilidade as boolean,
        categoriaId: this.editProdutoForm.value.CategoriaId as number
      }
      this.produtoService.editarProduto(produtoEditado).pipe(takeUntil(this.destroy$)).subscribe({
        next:() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto editado com sucesso',
            life: 2000
          })
          this.dialogRef.close()
          this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/cardapio']);
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: "Erro ao ao cadastrar o produto",
            life: 2000
          })
        }
      })
    }
  } //edita um produto
  getProdutoSelecionado(id:number): void {
    const produtos = this.produtoAction?.produtosData

    if (produtos?.length > 0) {
      const filtro = produtos.filter((element) => element.produtoId === id)

      if (filtro) {
        this.produtoSelecionadoData = filtro[0]
        this.editProdutoForm.setValue({
          Nome: this.produtoSelecionadoData?.nome as string,
          Preco: this.produtoSelecionadoData?.preco as number,
          CategoriaId: this.produtoSelecionadoData?.categoriaId as number,
          Disponibilidade: this.produtoSelecionadoData?.disponibilidade as boolean,
        })
      }
    }
  } //passa as informações de um produto
  getProdutoData(): void{
    this.produtoService.getProduto().pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        if (response.length > 0) {
          this.produtoList = response
          this.produtoList && this.produtoDTService.setProdutoData(this.produtoList)
        }
      }
    })
  } //pegas as informações dos produtos

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
