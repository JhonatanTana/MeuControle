using AutoMapper;
using MeuControleAPI.DTOs;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MeuControleAPI.Controllers;

[Route("[controller]")]
[ApiController]
public class FormaPagamentoController : Controller {

    private readonly IUnitOfWork _uof;
    private readonly IMapper _mapper;

    public FormaPagamentoController(IUnitOfWork uof, IMapper mapper) {

        _uof = uof;
        _mapper = mapper;
    }

    [HttpPost] // cria nova forma de pagamento
    public async Task<ActionResult<FormaPagamentoDTO>> Post(FormaPagamentoDTO pagamento) {


        if (pagamento is null) {

            return BadRequest();
        }

        var pagamentos = _mapper.Map<FormaPagamento>(pagamento);

        var pagamentoCriado = _uof.FormaPagamentoRepository.Create(pagamentos);
        await _uof.CommitAsync();

        var novoPagamentoDto = _mapper.Map<FormaPagamentoDTO>(pagamentoCriado);

        return new CreatedAtRouteResult("ObterFomaPagamento",
            new { id = novoPagamentoDto.PagamentoId }, pagamentoCriado);

    }

    [HttpGet] // recupera todas as formas de pagamento
    public async Task<ActionResult<FormaPagamentoDTO>> Get() {

        var forma = await _uof.FormaPagamentoRepository.GetAllAsync();

        if (forma == null) {

            return NotFound("Forma de Pagamento nao encontrada");
        }

        var formaPagamento = _mapper.Map<IEnumerable<FormaPagamentoDTO>>(forma);
        return Ok(formaPagamento);
    }

    [HttpGet("Ativas")] // recupera todas as formas de pagamento ativas
    public async Task<ActionResult<FormaPagamentoDTO>> GetAtiva() {

        var forma = await _uof.FormaPagamentoRepository.GetAllQueryableAsync();

        var filtro = forma.Where(f => f.Disponibilidade == true);

        if (forma == null) {

            return NotFound("Forma de Pagamento nao encontrada");
        }

        var formaPagamento = _mapper.Map<IEnumerable<FormaPagamentoDTO>>(filtro);
        return Ok(formaPagamento);
    }

    [HttpGet("{id:int}", Name = "ObterFomaPagamento")] // recupera a forma depagamento pelo ID
    public async Task<ActionResult<FormaPagamentoDTO>> Get(int id) {

        var forma = await _uof.FormaPagamentoRepository.GetAsync(p => p.PagamentoId == id);

        if (forma is null) {

            return NotFound("Forma de Pagamento ano encontrada");
        }

        var formaPagamento = _mapper.Map<FormaPagamentoDTO>(forma);
        return Ok(formaPagamento);
    }

    [HttpPut] // atualiza a forma de pagamento
    public async Task<ActionResult<FormaPagamentoDTO>> Put(FormaPagamentoDTO pagamento) {

        if (pagamento == null) {

            return BadRequest("Forma de Pagamento nao existe");
        }

        var forma = _mapper.Map<FormaPagamento>(pagamento);

        var formaAtualizada = _uof.FormaPagamentoRepository.Update(forma);
        await _uof.CommitAsync();

        var formaAtualizadaDTO = new FormaPagamentoDTO() {

            PagamentoId = formaAtualizada.PagamentoId,
            Nome = formaAtualizada.Nome,
        };

        return new CreatedAtRouteResult("ObterFomaPagamento",
            new { id = formaAtualizadaDTO.PagamentoId }, formaAtualizadaDTO);
    }
}
