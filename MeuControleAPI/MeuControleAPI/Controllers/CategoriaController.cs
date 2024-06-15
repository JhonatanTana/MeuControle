﻿using AutoMapper;
using MeuControleAPI.Context;
using MeuControleAPI.DTOs;
using MeuControleAPI.DTOs.Mapping;
using MeuControleAPI.Models;
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
public class CategoriaController : Controller {

    private readonly IUnitOfWork _uof;
    private readonly IMapper _mapper;

    public CategoriaController(IUnitOfWork uof, IMapper mapper) {

        _uof = uof;
        _mapper = mapper;
    }

    private ActionResult<IEnumerable<CategoriaDTO>> ObterCategorias(IPagedList<Categoria> categorias) {
        var metadata = new {
            categorias.Count,
            categorias.PageSize,
            categorias.PageCount,
            categorias.TotalItemCount,
            categorias.HasNextPage,
            categorias.HasPreviousPage
        };

        Response.Headers.Append("X-Pagination", JsonConvert.SerializeObject(metadata));

        var categoriasDto = _mapper.Map<IEnumerable<CategoriaDTO>>(categorias);

        return Ok(categoriasDto);
    }

    [HttpPost] // cria uma categoria
    public async Task<ActionResult<CategoriaDTO>> Post(CategoriaDTO categorias) {

        if (categorias is null) {

            return BadRequest();
        }

        var categoria = _mapper.Map<Categoria>(categorias);

        var categoriaCriada = _uof.CategoriaRepository.Create(categoria);
        await _uof.CommitAsync();

        var novaCategoriaDto = _mapper.Map<CategoriaDTO>(categoriaCriada);

        return new CreatedAtRouteResult("ObterCategoria",
            new { id = novaCategoriaDto.CategoriaId }, categoriaCriada);
    }

    [HttpGet] // recupera todas as categorias
    public async Task<ActionResult<CategoriaDTO>> Get() {

        var categorias = await _uof.CategoriaRepository.GetAllAsync();

        if (categorias is null) {

            return BadRequest("Nao existem categorias");
        }

        var categoriasDTO = _mapper.Map<IEnumerable<CategoriaDTO>>(categorias);

        return Ok(categoriasDTO);
    }

    [HttpGet("{id}", Name = "ObterCategoria")] // recupera a categoria pelo ID
    public async Task<ActionResult<CategoriaDTO>> Get(int id) {

        var categoria = await _uof.CategoriaRepository.GetAsync(c => c.CategoriaId == id, i => i.Include(p => p.Produtos));
        if (categoria is null) {

            return NotFound($"Categoria com id={id} nao encontrada ...");
        }

        var categoriaDto = _mapper.Map<CategoriaDTO>(categoria);

        return Ok(categoriaDto);
    }

    [HttpGet("Ativas")] // recupera todas as categorias ativas
    public async Task<ActionResult<CategoriaDTO>> GetCategoriasAtivas() {

        var categorias = await _uof.CategoriaRepository.GetAllAsync();

        if (categorias is null) {

            return BadRequest("Nao existem categorias");
        }

        var categoriasDTO = _mapper.Map<IEnumerable<CategoriaDTO>>(categorias).Where(c => c.Disponibilidade == true);

        return Ok(categoriasDTO);
    }

    [HttpGet("Produtos")] //recupera a categoria e seus produtos
    public async Task<ActionResult<CategoriaDTO>> GetCategoriasProdutos() {

        var categorias = await _uof.CategoriaRepository.GetAllQueryableAsync();

        var categoriaProdutos = categorias.Include(p => p.Produtos).ToList();

        var categoriasDTO = _mapper.Map<IEnumerable<CategoriaDTO>>(categoriaProdutos);

        return Ok(categoriasDTO);
    }

    [HttpPut] // edita a categoria
    public async Task<ActionResult<CategoriaDTO>> Put(CategoriaDTO categorias) {

        if (categorias is null) {

            return BadRequest($"Dados Inválidos ...");
        }

        var categoria = _mapper.Map<Categoria>(categorias);

        var categoriaAtualizada = _uof.CategoriaRepository.Update(categoria);
        await _uof.CommitAsync();

        var categoriaAtualizadaDto = new CategoriaDTO() {
            CategoriaId = categoriaAtualizada.CategoriaId,
            Nome = categoriaAtualizada.Nome,
            Disponibilidade = categoriaAtualizada.Disponibilidade,
        };

        return Ok(categoriaAtualizadaDto);
    }
}
