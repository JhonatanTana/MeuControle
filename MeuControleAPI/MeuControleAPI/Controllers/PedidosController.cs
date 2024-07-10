using AutoMapper;
using MeuControleAPI.DTOs;
using MeuControleAPI.DTOs.Request;
using MeuControleAPI.DTOs.Resposta;
using MeuControleAPI.Models;
using MeuControleAPI.Pagination;
using MeuControleAPI.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using X.PagedList;

namespace MeuControleAPI.Controllers;

[Route("[controller]")]
[ApiController]
public class PedidosController : Controller {

    private readonly IUnitOfWork _uof;
    private readonly IMapper _mapper;

    public PedidosController(IUnitOfWork uof, IMapper mapper) {

        _uof = uof;
        _mapper = mapper;
    }
    private ActionResult<IEnumerable<PedidoDTO>> ObterPedidos(IPagedList<Pedido> pedidos) {

        var metadata = new {
            pedidos.Count,
            pedidos.PageSize,
            pedidos.PageCount,
            pedidos.TotalItemCount,
            pedidos.HasNextPage,
            pedidos.HasPreviousPage
        };

        Response.Headers.Append("X-Pagination", JsonConvert.SerializeObject(metadata));

        var pedidosDto = _mapper.Map<IEnumerable<PedidoDTO>>(pedidos);

        return Ok(pedidosDto);
    }
    private void CalcularValorTotal(PedidoDTO pedido) {

        if (pedido != null && pedido.ProdutosPedido != null) {

            pedido.ValorTotal = pedido.ProdutosPedido.Sum(ip => ip.PrecoTotal);
        }
        else {
            pedido.ValorTotal = 0;
        }
    }

    [Authorize]
    [HttpPost] // cria um novo pedido
    public async Task<ActionResult<PedidoDTO>> Post(PedidoDTO pedidos) {

        if (pedidos is null) {

            return NotFound("Pedido nao encontrado");
        }

        var pedido = _mapper.Map<Pedido>(pedidos);

        var criado = _uof.PedidoRepository.Create(pedido);

        await _uof.CommitAsync();

        var pedidoCriado = _mapper.Map<Pedido>(criado);
        return Ok(pedidoCriado);
    }

    [Authorize]
    [HttpGet] // recupera todos os pedidos
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> Get() {
        var pedidos = await _uof.PedidoRepository.GetAllQueryableAsync();

        var filtro = pedidos.Include(p => p.ProdutosPedido);

        if (pedidos == null || !pedidos.Any()) {
            return NotFound("Nenhum pedido encontrado");
        }

        var pedidoDTOs = _mapper.Map<IEnumerable<PedidoDTO>>(filtro);
        foreach (var pedidoDTO in pedidoDTOs) {
            CalcularValorTotal(pedidoDTO); // Chamando para cada pedidoDTO individual
        }

        return Ok(pedidoDTOs);
    }

    [Authorize]
    [HttpGet("Abertos")] // recupera todos os pedidos abertos
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetAbertos() {

        var pedidos = await _uof.PedidoRepository.GetAllQueryableAsync();

        var filtro = pedidos.Include(p => p.ProdutosPedido).Where(pd => pd.Disponibilidade == true);

        if (pedidos == null || !pedidos.Any()) {
            return NotFound("Nenhum pedido encontrado");
        }

        var pedidoDTOs = _mapper.Map<IEnumerable<PedidoDTO>>(filtro);
        foreach (var pedidoDTO in pedidoDTOs) {
            CalcularValorTotal(pedidoDTO); // Chamando para cada pedidoDTO individual
        }

        return Ok(pedidoDTOs);
    }

    [Authorize]
    [HttpGet("Encerrados")] // recupera todos os pedidos fechados e filtra por data
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetEncerrados() {

        var pedidos = await _uof.PedidoRepository.GetAllQueryableAsync();

        var filtro = pedidos.Include(p => p.ProdutosPedido).Where(pd => pd.Disponibilidade == false);

        if (pedidos == null || !pedidos.Any()) {
            return NotFound("Nenhum pedido encontrado");
        }

        var pedidoDTOs = _mapper.Map<IEnumerable<PedidoDTO>>(filtro);
        foreach (var pedidoDTO in pedidoDTOs) {
            CalcularValorTotal(pedidoDTO); // Chamando para cada pedidoDTO individual
        }

        return Ok(pedidoDTOs);
    }

    [Authorize]
    [HttpGet("Completo/{id:int}", Name = "ObterPedido")] // recupera o pedido e seus produtos pelo ID
    public async Task<ActionResult<PedidoDTO>> Get(int id) {

        var pedido = await _uof.PedidoRepository.GetAsync(
            p => p.PedidoId == id,
            i => i.Include(p => p.ProdutosPedido).ThenInclude(pp => pp.Produto)
        );

        if (pedido == null) {
            return NotFound($"Pedido com id={id} não encontrado.");
        }

        var pedidoDto = _mapper.Map<PedidoDTO>(pedido);
        CalcularValorTotal(pedidoDto);

        return Ok(pedidoDto);
    }

    [Authorize]
    [HttpPatch("/Conclui")] // Encerra o pedido
    public async Task<ActionResult<PedidoDTOUpdateResponse>> Patch([FromBody] PedidoDTOUpdateResquest patchPedidoDto) {

        var pedido = await _uof.PedidoRepository.GetAsync(c => c.PedidoId == patchPedidoDto.PedidoId);

        if (pedido == null)
            return NotFound("Pedido não encontrado");

        pedido.PedidoId = patchPedidoDto.PedidoId;
        pedido.ValorTotal = patchPedidoDto.ValorTotal;
        pedido.Disponibilidade = patchPedidoDto.Disponibilidade;
        pedido.FormaPagamento = patchPedidoDto.FormaPagamento;

        _uof.PedidoRepository.Update(pedido);
        await _uof.CommitAsync();

        var pedidoResponse = _mapper.Map<PedidoDTOUpdateResponse>(pedido);
        return Ok(pedidoResponse);
    }
}
