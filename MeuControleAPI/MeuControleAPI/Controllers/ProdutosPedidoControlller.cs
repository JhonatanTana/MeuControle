using AutoMapper;
using MeuControleAPI.DTOs;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace MeuControleAPI.Controllers;

[Route("[controller]")]
[ApiController]
public class ProdutosPedidoController : Controller {

    private readonly IUnitOfWork _uof;
    private readonly IMapper _mapper;

    public ProdutosPedidoController(IUnitOfWork uof, IMapper mapper) {

        _uof = uof;
        _mapper = mapper;
    }

    private void UpdatePrecoTotal(ProdutosPedido produtosPedido) {

        if (produtosPedido.Produto != null) {
            produtosPedido.PrecoTotal = produtosPedido.Produto.Preco * produtosPedido.Quantidade;
        }
    }

    [HttpPost] // cria produtos
    public async Task<ActionResult<ProdutosPedidoDTO>> Post(ProdutosPedidoDTO produtosPedidoDTO) {

        var produtos = await _uof.ProdutoRepository.GetAsync(p => p.ProdutoId == produtosPedidoDTO.ProdutoId);

        if (produtos is null) {

            return BadRequest($"{produtosPedidoDTO.ProdutoId} nao encontrado");
        }

        if (produtosPedidoDTO is null) {

            return BadRequest("Produto nao encontrado");
        }

        var pPedido = _mapper.Map<ProdutosPedido>(produtosPedidoDTO);

        pPedido.Produto = produtos;
        UpdatePrecoTotal(pPedido);

        var criado = _uof.ProdutosPedidoRepository.Create(pPedido);
        await _uof.CommitAsync();

        var pPedidoCriado = _mapper.Map<ProdutosPedidoDTO>(criado);
        return Ok(pPedidoCriado);
    }

    // recupera produtos *PUT*

    // recupera produtos pelo ID do pedido

    // deleta produtos
}
