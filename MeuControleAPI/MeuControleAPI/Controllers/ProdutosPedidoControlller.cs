using AutoMapper;
using MeuControleAPI.DTOs;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [Authorize]
    [HttpPost] // cria produtos
    public async Task<ActionResult<ProdutosPedidoDTO>> Post(ProdutosPedidoDTO produtosPedidoDTO) {

        var pedido = await _uof.ProdutoRepository.GetAsync(p => p.ProdutoId == produtosPedidoDTO.ProdutoId);

        if (pedido is null) {

            return BadRequest($"{produtosPedidoDTO.ProdutoId} nao encontrado");
        }

        if (produtosPedidoDTO is null) {

            return BadRequest("Produto nao encontrado");
        }

        var pPedido = _mapper.Map<ProdutosPedido>(produtosPedidoDTO);

        pPedido.Produto = pedido;
        UpdatePrecoTotal(pPedido);

        var criado = _uof.ProdutosPedidoRepository.Create(pPedido);
        await _uof.CommitAsync();

        var pPedidoCriado = _mapper.Map<ProdutosPedidoDTO>(criado);
        return Ok(pPedidoCriado);
    }

    [Authorize]
    [HttpGet("Pedido/{id:int}")] // recupera produtos pelo ID do pedido
    public async Task<ActionResult<ProdutosPedidoDTO>> Get(int id) {

        var pedido = await _uof.ProdutosPedidoRepository.GetAllQueryableAsync();

        var filtro = pedido.Include(p => p.Produto).Where(p => p.PedidoId == id);

        if (pedido is null) {

            return BadRequest("Produtos nao encontrado");
        }

        var produtosPedido = _mapper.Map<IEnumerable<ProdutosPedidoDTO>>(filtro);
        return Ok(produtosPedido);
    }

    [Authorize]
    [HttpDelete("{id:int}")] // deleta produtos
    public async Task<ActionResult<ProdutosPedidoDTO>> Delete(int id) {

        var pedido = await _uof.ProdutosPedidoRepository.GetAsync(p => p.ProdutosPedidoId == id);

        if (pedido is null) {

            return BadRequest("Produto nao existe");
        }

        var deletado = _uof.ProdutosPedidoRepository.Delete(pedido);
        await _uof.CommitAsync();

        var pedidoDeletado = _mapper.Map<ProdutosPedidoDTO>(deletado);

        return NoContent();
    }
}
