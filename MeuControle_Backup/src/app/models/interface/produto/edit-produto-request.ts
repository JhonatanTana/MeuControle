export interface EditProdutoRequest {
  produtoId: number,
  nome: string,
  preco: number,
  disponibilidade: boolean,
  categoriaId: number
}
