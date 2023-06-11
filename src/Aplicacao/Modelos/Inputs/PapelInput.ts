import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";

class AdicionarPapelInput {

  nome: string;

  constructor(nome: string){
    this.nome = nome;
  }

  static construirDoRequest = (papel: any) : AdicionarPapelInput | null => {
    if(Validadores.EhValorInvalido(papel))
      return null;

    const { nome } = papel;

    return new AdicionarPapelInput(nome);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    
    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.nome))
      notificacoes.push(new Notificacao("Nome do papel precisa ser preenchido", TipoNotificacao.DadoIncorreto, 
        this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.nome, 4, 30))
      notificacoes.push(new Notificacao("Nome do papel precisa conter entre 4 e 30 caracteres", TipoNotificacao.DadoIncorreto, 
        this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.nome, 'string'))
      notificacoes.push(new Notificacao("Nome do papel precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    return notificacoes;
  }
}

export { AdicionarPapelInput }