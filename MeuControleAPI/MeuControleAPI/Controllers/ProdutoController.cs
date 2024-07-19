using AutoMapper;
using MeuControleAPI.DTOs;
using MeuControleAPI.DTOs.Request;
using MeuControleAPI.DTOs.Resposta;
using MeuControleAPI.Models;
using MeuControleAPI.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [Authorize]
    [HttpPost] // cria um produto
    public async Task<ActionResult<ProdutoDTO>> Post([FromForm] ProdutoDTO produtos) {
        if (produtos is null) {
            return BadRequest("Produtos não encontrado");
        }

        if (produtos.file != null && produtos.file.Length > 0) {
            var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads");

            if (!Directory.Exists(uploadsFolderPath)) {
                Directory.CreateDirectory(uploadsFolderPath);
            }
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + produtos.file.FileName;
            var filePath = Path.Combine(uploadsFolderPath, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create)) {
                await produtos.file.CopyToAsync(fileStream);
            }
            produtos.ImagemUrl = $"/Uploads/{uniqueFileName}";
        }

        var produto = _mapper.Map<Produto>(produtos);

        var produtoCriado = _uof.ProdutoRepository.Create(produto);
        await _uof.CommitAsync();

        var novoProdutoDto = _mapper.Map<ProdutoDTO>(produtoCriado);

        return new CreatedAtRouteResult("ObterProduto",
            new { id = novoProdutoDto.ProdutoId }, novoProdutoDto);
    }

    [Authorize]
    [HttpGet] // recupera todos os produtos
    public async Task<ActionResult<IEnumerable<ProdutoDTO>>> Get() {
        var produtos = await _uof.ProdutoRepository.GetAllQueryableAsync();

        var filtro = produtos.Include(c => c.Categorias).ToList();

        if (filtro is null || !filtro.Any()) {
            return BadRequest("Produtos não encontrados");
        }

        var produtosDTO = _mapper.Map<IEnumerable<ProdutoDTO>>(filtro);

        var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";

        foreach (var produtoDto in produtosDTO) {
            if (string.IsNullOrEmpty(produtoDto.ImagemUrl)) {
                produtoDto.ImagemUrl = baseUrl + "/Uploads/sem-foto.jpg";
            }
            else {
                produtoDto.ImagemUrl = baseUrl + produtoDto.ImagemUrl;
            }
        }

        return Ok(produtosDTO);
    }

    [Authorize]
    [HttpGet("Disponivel")] // recupera todos os produtos
    public async Task<ActionResult<ProdutoDTO>> GetDisponiveis() {

        var produtos = await _uof.ProdutoRepository.GetAllQueryableAsync();

        var filtro = produtos.Where(p => p.Disponibilidade == true);

        if (produtos is null) {

            return BadRequest("Produtos nao eoncontrado");
        }

        var produtosDTO = _mapper.Map<IEnumerable<ProdutoDTO>>(filtro);

        var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";

        foreach (var produtoDto in produtosDTO) {
            if (string.IsNullOrEmpty(produtoDto.ImagemUrl)) {
                produtoDto.ImagemUrl = baseUrl + "/Uploads/sem-foto.jpg";
            }
            else {
                produtoDto.ImagemUrl = baseUrl + produtoDto.ImagemUrl;
            }
        }

        return Ok(produtosDTO);
    }

    [Authorize]
    [HttpGet("{id}", Name = "ObterProduto")] // recupera o produto pelo ID
    public async Task<ActionResult<ProdutoDTO>> Get(int id) {

        var produto = await _uof.ProdutoRepository.GetAsync(p => p.ProdutoId == id);

        if (produto is null) {
            return NotFound("Produto não encontrado...");
        }

        var produtoDto = _mapper.Map<ProdutoDTO>(produto);

        var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
        if (string.IsNullOrEmpty(produtoDto.ImagemUrl)) {
            produtoDto.ImagemUrl = baseUrl + "/Uploads/sem-foto.jpg";
        }
        else {
            produtoDto.ImagemUrl = baseUrl + produtoDto.ImagemUrl;
        }

        return Ok(produtoDto);
    }

    [Authorize]
    [HttpPatch] // edita um produto //Alterar para PATCH
    public async Task<ActionResult<ProdutoDTOUpdateRequest>> Patch(ProdutoDTOUpdateRequest patchProdutos) {

        var produto = await _uof.ProdutoRepository.GetAsync(p => p.ProdutoId ==  patchProdutos.ProdutoId);

        if (produto is null) {
            return NotFound("Produto nao encontrado");
        }

        produto.Preco = patchProdutos.Preco;
        produto.Nome = patchProdutos.Nome;
        produto.Disponibilidade = patchProdutos.Disponibilidade;
        produto.CategoriaId = patchProdutos.CategoriaId;

        _uof.ProdutoRepository.Update(produto);
        await _uof.CommitAsync();

        var response = _mapper.Map<ProdutoDTOUpdateResponse>(produto);

        return Ok(response);
    }

    [Authorize]
    [HttpDelete("{id:int}")] //deleta um produto
    public async Task<ActionResult<ProdutoDTO>> Delete(int id) {

        var produto = await _uof.ProdutoRepository.GetAsync(p => p.ProdutoId == id);

        if (produto is null) {

            return NotFound("Produto nao encontrado");
        }

        var deletado = _uof.ProdutoRepository.Delete(produto);
        await _uof.CommitAsync();

        var produtoDeletado = _mapper.Map<ProdutoDTO>(deletado);

        return Ok(produtoDeletado);
    }
}
