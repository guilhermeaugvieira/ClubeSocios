class Validadores{

  static ehValorInvalidoOuEspacoEmBranco = (valor: string | null| undefined) => {
    if(valor === null || valor === undefined)
      return true;

    if(typeof(valor) !== 'string')
      return false;
    
    if(valor.trim().length === 0)
      return true;

    return false;
  }

  static ehValorInvalido = <TData>(valor: TData | null | undefined) => {
    if(valor === null || valor === undefined)
      return true;

    return false;
  }

  static ehNumeroMaiorQue = (numero: number | null | undefined, numeroComparado: number | null | undefined) => {
    if(numero === null || numero === undefined)
      return false;

    if(numeroComparado === null || numeroComparado === undefined)
      return false;

    if(typeof(numero) !== 'number')
      return false;

    if(typeof(numeroComparado) !== 'number')
      return false;
    
    if(numero > numeroComparado)
      return true;

    return false;
  }

  static ehNumeroMaiorOuIgualA = (numero: number | null | undefined, numeroComparado: number | null | undefined) => {
    if(numero === null || numero === undefined)
      return false;

    if(numeroComparado === null || numeroComparado === undefined)
      return false;

    if(typeof(numero) !== 'number')
      return false;

    if(typeof(numeroComparado) !== 'number')
      return false;
    
    if(numero >= numeroComparado)
      return true;

    return false;
  }

  static ehNumeroMenorQue = (numero: number | null | undefined, numeroComparado: number | null | undefined) => {
    if(numero === null || numero === undefined)
      return false;

    if(numeroComparado === null || numeroComparado === undefined)
      return false;

    if(typeof(numero) !== 'number')
      return false;

    if(typeof(numeroComparado) !== 'number')
      return false;
    
    if(numero < numeroComparado)
      return true;

    return false;
  }

  static ehNumeroMenorOuIgualA = (numero: number | null | undefined, numeroComparado: number | null | undefined) => {
    if(numero === null || numero === undefined)
      return false;

    if(numeroComparado === null || numeroComparado === undefined)
      return false;

    if(typeof(numero) !== 'number')
      return false;

    if(typeof(numeroComparado) !== 'number')
      return false;
    
    if(numero <= numeroComparado)
      return true;

    return false;
  }

  static ehIgual = <TValor>(valor1: TValor, valor2: TValor) => {
    if (valor1 === valor2)
      return true;

    return false;
  }

  static textoComComprimentoEntre = (texto: string | null | undefined, comprimentoMinimoEsperado: number, comprimentoMaximoEsperado?: number) => {
    if(texto === null || texto === undefined)
      return false;

    if(typeof(texto) !== 'string')
      return false;

    comprimentoMaximoEsperado = comprimentoMaximoEsperado ?? comprimentoMinimoEsperado;
    
    if(texto.length >= comprimentoMinimoEsperado && texto.length <= comprimentoMaximoEsperado)
      return true;

    return false;
  }

  static textoComUmDosCaracteres = (texto: string | null | undefined, caracteres: string[]) => {
    if(texto === null || texto === undefined)
      return false;

    if(typeof(texto) !== 'string')
      return false;

    return caracteres.some(caracter => texto.includes(caracter));
  }

  static ehVariavelDoTipo = (variavel: any, tipoEsperado: string) => {
    if(variavel === null || variavel === undefined)
      return false;

    return typeof(variavel) === tipoEsperado;
  }

}

export { Validadores };