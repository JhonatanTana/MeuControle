document.getElementById("preco").addEventListener("input", function() {
    var precoInput = this.value;
    var precoSemVirgula = precoInput.replace(/,/g, '.');
    this.value = precoSemVirgula;
});