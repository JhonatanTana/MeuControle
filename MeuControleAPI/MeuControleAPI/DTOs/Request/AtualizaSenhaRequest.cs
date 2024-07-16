namespace MeuControleAPI.DTOs.Request; 
public class AtualizaSenhaRequest {

    public string Id { get; set; }
    public string SenhaAtual { get; set; }
    public string NovaSenha { get; set; }
}
