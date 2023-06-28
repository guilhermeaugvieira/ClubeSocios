import { CONJUNTO_ALFABETO_MINUSCULO, CONJUNTO_CARACTERES_ESPECIAIS } from "../../../Core/Constantes";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";

class AdicionarVeiculoSocioInput {
  placa: string;

  constructor(placa: string){
    this.placa = placa;
  }

  static construirDoRequest = (veiculoSocio: any) => {   
    if(Validadores.ehValorInvalido(veiculoSocio))
      return null;
    
    const { placa } = veiculoSocio;
    
    return new AdicionarVeiculoSocioInput(placa);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(!Validadores.ehVariavelDoTipo(this.placa, 'string'))
      notificacoes.push(new Notificacao("Placa precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.placa))
      notificacoes.push(new Notificacao("Placa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
  
    if(!Validadores.textoComComprimentoEntre(this.placa, 7))
      notificacoes.push(new Notificacao("Placa precisa ter 7 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.textoComUmDosCaracteres(this.placa, ['-', ...CONJUNTO_CARACTERES_ESPECIAIS, ...CONJUNTO_ALFABETO_MINUSCULO]))
      notificacoes.push(new Notificacao("Placa só pode conter números e letras maiúsculas", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

class AtualizarVeiculoSocioInput {
  placa: string;

  constructor(placa: string){
    this.placa = placa;
  }

  static construirDoRequest = (veiculoSocio: any) => {   
    if(Validadores.ehValorInvalido(veiculoSocio))
      return null;
    
    const { placa } = veiculoSocio;
    
    return new AtualizarVeiculoSocioInput(placa);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(!Validadores.ehVariavelDoTipo(this.placa, 'string'))
    notificacoes.push(new Notificacao("Placa precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

  if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.placa))
    notificacoes.push(new Notificacao("Placa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

  if(!Validadores.textoComComprimentoEntre(this.placa, 7))
    notificacoes.push(new Notificacao("Placa precisa ter 7 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

  if(Validadores.textoComUmDosCaracteres(this.placa, ['-', ...CONJUNTO_CARACTERES_ESPECIAIS, ...CONJUNTO_ALFABETO_MINUSCULO]))
    notificacoes.push(new Notificacao("Placa só pode conter números e letras maiúsculas", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

export { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput }

