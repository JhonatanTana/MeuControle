export interface ProdutoPedidoResponse {
  produtosPedidoId: number,
  quantidade: number,
  precoTotal: number,
  produtoId: number,
  pedidoId: number,
  produtos: {
    produtoId: number,
    nome: string,
    preco: number,
  }
}
