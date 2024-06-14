using AutoMapper;
using MeuControleAPI.DTOs;
using MeuControleAPI.Repositories.Interface;
using MeuControleAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet] // recupera todos os pedidos
    public async Task<ActionResult<PedidoDTO>> Get() {

        var pedidos = await _uof.PedidoRepository.GetAllAsync();

        if (pedidos is null) {

            return BadRequest("Pedido nao encontrado");
        }

        var pedidoDTO = _mapper.Map<IEnumerable<PedidoDTO>>(pedidos);
        return Ok(pedidoDTO);
    }

    [HttpGet("Completo/{id:int}", Name = "ObterPedido")] // recupera o pedido e seus produtos pelo ID
    public async Task<ActionResult<PedidoDTO>> Get(int id) {
        var pedido = await _uof.PedidoRepository.GetAsync(
            p => p.PedidoId == id,
            i => i.Include(p => p.ProdutosPedido).ThenInclude(pp => pp.Produto)
        );

        if (pedido is null) {
            return NotFound($"Pedido com id={id} não encontrado.");
        }

        var pedidoDto = _mapper.Map<PedidoDTO>(pedido);

        return Ok(pedidoDto);
    }

    [HttpGet("Produtos")] //recupera todos os pedidos e seus produtos
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetProdutosPedidos() {

        var pedidos = await _uof.PedidoRepository.GetAllQueryableAsync();

        var pedidosProdutos = await pedidos.Include(p => p.FormaPagamento).Include(pp => pp.ProdutosPedido).ThenInclude(p => p.Produto).ToListAsync();

        var pedidosDTO = _mapper.Map<IEnumerable<PedidoDTO>>(pedidosProdutos);

        return Ok(pedidosDTO);
    }

    [HttpGet("Encerrados")] // recupera os pedidos encerrados
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetPedidoFinalizado() {

        var pedidos = await _uof.PedidoRepository.GetAllQueryableAsync();

        var finalizados = pedidos.Include(p => p.FormaPagamento).Where(p => p.Disponibilidade == false); 

        var pedidosFinalizados = await finalizados.ToListAsync();

        var pedidosFinalizadosDTO = _mapper.Map<IEnumerable<PedidoDTO>>(pedidosFinalizados);

        return Ok(pedidosFinalizadosDTO);
    }

    [HttpGet("Abertos")] // recupera os pedidos em aberto
    public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetPedidoAtivos() {

        var pedidos = await _uof.PedidoRepository.GetAllQueryableAsync();

        var finalizados = pedidos.Include(p => p.FormaPagamento).Where(p => p.Disponibilidade == true);

        var pedidosFinalizados = await finalizados.ToListAsync();

        var pedidosFinalizadosDTO = _mapper.Map<IEnumerable<PedidoDTO>>(pedidosFinalizados);

        return Ok(pedidosFinalizadosDTO);
    }
}
