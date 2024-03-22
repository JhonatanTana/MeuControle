function adicionarCategoria() {
    let categoria = document.getElementById('novacategoria')
    categoria.style.display = (categoria.style.display === "none") ? "block" : "none";
}

function fecharPopup(elemento) {
    elemento.style.display = (elemento.style.display === "none") ? "block" : "none";
}

function adicionarProduto() {
    let produto = document.getElementById('novoproduto')
    produto.style.display = (produto.style.display === "none") ? "block" : "none";
}

function desativarProduto(produto) {
    var idProduto = produto.id;
    var disponibilidade = produto.checked ? '1' : '0'; // Agora atribui 'true' quando o checkbox está marcado

    var queryString = '/' + '?produto=' + encodeURIComponent(idProduto) + '&disponibilidade=' + encodeURIComponent(disponibilidade);
    var novaURL = window.location.href + queryString;
    window.location.href = novaURL;
}