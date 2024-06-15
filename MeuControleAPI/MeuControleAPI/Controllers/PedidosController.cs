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
        return new CreatedAtRouteResult("ObterPedido", new { id = pedidoCriado.PedidoId }, pedidoCriado);
    }

    [Authorize]
    [HttpGet] // recupera todos os pedidos
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> Get() {
        var pedidos = await _uof.PedidoRepository.GetAllAsync();

        if (pedidos == null || !pedidos.Any()) {
            return BadRequest("Pedido nao encontrado");
        }

        var pedidoDTOs = _mapper.Map<IEnumerable<PedidoDTO>>(pedidos);

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
    [HttpGet("Produtos")] //recupera todos os pedidos e seus produtos
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetProdutosPedidos() {

        var pedidos = await _uof.PedidoRepository.GetAllQueryableAsync();

        var pedidosProdutos = await pedidos.Include(p => p.FormaPagamento).Include(pp => pp.ProdutosPedido).ThenInclude(p => p.Produto).ToListAsync();

        var pedidosDTO = _mapper.Map<IEnumerable<PedidoDTO>>(pedidosProdutos);

        return Ok(pedidosDTO);
    }

    [Authorize]
    [HttpGet("Paginado/Abertos")] // recupera todos os pedidos abertos
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetAbertos([FromQuery] PedidoParameters pedidoParameters) {

        var pedidos = await _uof.PedidoRepository.GetPedidoAbertosAsync(pedidoParameters);
        return ObterPedidos(pedidos);
    }

    [Authorize]
    [HttpGet("Paginado/Encerrados")] // recupera todos os pedidos fechados e filtra por data
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetProdutosFilterPreco([FromQuery] PedidosFiltroData pedidoFiltroParams) {

        var produtos = await _uof.PedidoRepository.GetPedidoFiltroDataAsync(pedidoFiltroParams);
        return ObterPedidos(produtos);
    }

    [Authorize]
    [HttpPatch("/Atualiza/{id}")] // Encerra o pedido
    public async Task<ActionResult<PedidoDTOUpdateResponse>> Patch(JsonPatchDocument<PedidoDTOUpdateResquest> patchPedidoDto, int id) {

        if (patchPedidoDto == null || id <= 0)
            return BadRequest();

        var pedido = await _uof.PedidoRepository.GetAsync(c => c.PedidoId == id);

        if (pedido == null)
            return NotFound("Pedido nao encontrado");

        var pedidoUpdateRequest = _mapper.Map<PedidoDTOUpdateResquest>(pedido);

        patchPedidoDto.ApplyTo(pedidoUpdateRequest, ModelState);

        if (!ModelState.IsValid || !TryValidateModel(pedidoUpdateRequest))
            return BadRequest(ModelState);

        _mapper.Map(pedidoUpdateRequest, pedido);

        _uof.PedidoRepository.Update(pedido);
        await _uof.CommitAsync();

        return Ok(_mapper.Map<PedidoDTOUpdateResquest>(pedido));
    }
}
