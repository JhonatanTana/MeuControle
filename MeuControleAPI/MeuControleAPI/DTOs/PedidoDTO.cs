﻿using MeuControleAPI.Models;

namespace MeuControleAPI.DTOs;
public class PedidoDTO {

    public int PedidoId { get; set; }
    public string? Nome { get; set; }
    public int Mesa { get; set; }
    public DateOnly Data { get; set; }
    public decimal ValorTotal { get; set; }
    public bool Disponibilidade { get; set; }
    public FormaPagamento? FormaPagamento { get; set; }
    public ICollection<ProdutosPedido>? ProdutosPedido { get; set; }
}
