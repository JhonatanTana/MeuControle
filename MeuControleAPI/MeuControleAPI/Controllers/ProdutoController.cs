﻿using AutoMapper;
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
public class ProdutoController : Controller {

    private readonly IUnitOfWork _uof;
    private readonly IMapper _mapper;

    public ProdutoController(IUnitOfWork uof, IMapper mapper) {

        _uof = uof;
        _mapper = mapper;
    }

    [HttpPost] // cria uma categoria
    public async Task<ActionResult<ProdutoDTO>> Post(ProdutoDTO produtos) {

        if (produtos is null) {

            return BadRequest();
        }

        var produto = _mapper.Map<Produto>(produtos);

        var produtoCriado = _uof.ProdutoRepository.Create(produto);
        await _uof.CommitAsync();

        var novoProdutoDto = _mapper.Map<ProdutoDTO>(produtoCriado);

        return new CreatedAtRouteResult("ObterProduto",
            new { id = novoProdutoDto.ProdutoId }, novoProdutoDto);
    }

    [HttpGet] // recupera todos os produtos
    public async Task<ActionResult<ProdutoDTO>> Get() {

        var produtos = await _uof.ProdutoRepository.GetAllAsync();

        if (produtos is null) {

            return BadRequest();
        }

        var produtosDTO = _mapper.Map<IEnumerable<ProdutoDTO>>(produtos);

        return Ok(produtosDTO);
    }

    [HttpGet("{id}", Name = "ObterProduto")] // recupera o produto pelo ID
    public async Task<ActionResult<ProdutoDTO>> Get(int id) {

        var produto = await _uof.ProdutoRepository.GetAsync(p => p.ProdutoId == id);

        if (produto is null) {
            return NotFound("Produto não encontrado...");
        }

        var produtoDto = _mapper.Map<ProdutoDTO>(produto);
        return Ok(produtoDto);
    }

    [HttpPut] // edita um produto
    public async Task<ActionResult<ProdutoDTO>> Put(ProdutoDTO produtos) {

        if (produtos is null) {

            return NotFound("Produto nao encontrado");
        }

        var produto = _mapper.Map<Produto>(produtos);

        var produtoAtualizado = _uof.ProdutoRepository.Update(produto);

        await _uof.CommitAsync();

        var produtoAtualizadoDto = new ProdutoDTO() {
            ProdutoId = produtoAtualizado.ProdutoId,
            Nome = produtoAtualizado.Nome,
            Preco = produtoAtualizado.Preco,
            Disponibilidade = produtoAtualizado.Disponibilidade,
        };

        return Ok(produtoAtualizadoDto);
    }

    [HttpDelete("{id:int}")] //deleta um produto
    public async Task<ActionResult<ProdutoDTO>> Delete(int id) {

        var produto = await _uof.ProdutoRepository.GetAsync(p => p.ProdutoId == id);

        if (produto is null) {

            return NotFound("Produto nao encontrado");
        }

        var deletado = _uof.ProdutoRepository.Delete(produto);
        await _uof.CommitAsync();

        var produtoDeletado = _mapper.Map<ProdutoDTO>(deletado);

        return NoContent();
    }
}
