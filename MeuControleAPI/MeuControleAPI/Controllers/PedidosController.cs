using AutoMapper;
using MeuControleAPI.DTOs;
using MeuControleAPI.Repositories.Interface;
using AutoMapper;
using MeuControleAPI.Context;
using MeuControleAPI.DTOs;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;
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

    [HttpGet]
    public async Task<ActionResult<PedidoDTO>> Get() {

        var pedidos = await _uof.PedidoRepository.GetAllAsync();

        if (pedidos is null) {

            return BadRequest("Pedido nao encontrado");
        }

        var pedidoDTO = _mapper.Map<IEnumerable<PedidoDTO>>(pedidos);
        return Ok(pedidoDTO);
    }
}
